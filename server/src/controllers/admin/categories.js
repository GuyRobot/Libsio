import mongoose from 'mongoose';
import response from '../../helpers/response';
import request from '../../helpers/request';
import pagination from '../../helpers/pagination';

import _ from 'underscore';

const Category = mongoose.model('Category');

exports.list = function (req, res) {
    Category.paginate({}, request.getRequestOptions(req), function (err, result) {
        if (err) return response.sendNotFound(res);
        pagination.setPaginationHeaders(res, result);
        res.json(result.docs);
    });
};

exports.create = function (req, res) {

    const attrs = _.pick(req.body, "name")
    const item = new Category(attrs);
    item.save(function (err, item) {
        if (err) return response.sendBadRequest(res, err);
    });
};

exports.read = function (req, res) {
    Category.findById(req.params.id, function (err, item) {
        if (err) return response.sendNotFound(res);
        if (!req.currentUser.canRead(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.update = function (req, res) {
    const attrs = _.pick(req.body, "name")
    Category.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        res.json(item);
    });
};

exports.delete = function (req, res) {
    Category.findOne({ _id: req.params.id }, async function (err, item) {
        if (err) return response.sendNotFound(res);
        await Category.deleteOne(item).exec()
        res.json({ message: 'Item successfully deleted' });
    });
};
