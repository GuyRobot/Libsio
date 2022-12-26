import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';

const Resource = mongoose.model('Resource');

exports.list = async function (req, res) {
    const queryRefs = [{ name: "category", model: "Category" }];
    let query = Object.assign({ owner: req.currentUser._id }, request.getFilteringOptions(req, ['name']));
    for (const ref of queryRefs) {
        if (ref["name"] in req.query) {
            query = await Resource.findByRef(
                ref["model"],
                ref["name"],
                query,
                req.query[ref["name"]]
            );
        }
    }

    Resource.paginate(query, request.getRequestOptions(req), function (err, result) {
        if (err) return response.sendNotFound(res);
        pagination.setPaginationHeaders(res, result);
        res.json(result.docs);
    });
};

exports.create = function (req, res) {
    const user = req.currentUser;

    const attrs = _.pick(req.body, "title", "link", "description", "image", "tags", "category")
    const item = new Resource(attrs);
    item.owner = user._id;
    item.save(function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        user.resources.push(item);
        user.save(function (err, user) {
            if (err) return response.sendBadRequest(res, err);
            response.sendCreated(res, item);
        });
    });
};

exports.read = function (req, res) {
    Resource.findById(req.params.id, function (err, item) {
        if (err) return response.sendNotFound(res);
        if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.update = function (req, res) {
    const attrs = _.pick(req.body, "title", "link", "description", "image", "tags", "category")
    Resource.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.delete = function (req, res) {
    Resource.findOne({ _id: req.params.id }, async function (err, item) {
        if (err) return response.sendNotFound(res);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        await Resource.deleteOne(item).exec()
        res.json({ message: 'Item successfully deleted' });
    });
};
