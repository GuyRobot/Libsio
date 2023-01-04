import mongoose from 'mongoose';
import response from '../../helpers/response';

import _ from 'underscore';

const Resource = mongoose.model('Resource');

exports.list = function (req, res) {
    Resource.find({})
        .populate({
            path: "owner",
        })
        .exec(function (err, result) {
            if (err) return response.sendNotFound(res);
            res.json(result);
        })
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

exports.update = function (req, res) {
    const attrs = _.pick(req.body, "title", "link", "description", "image", "tags", "category")
    Resource.findOneAndUpdate({ _id: req.params.id }, attrs, { new: true }, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.approve = function (req, res) {
    const attrs = { status: true }
    Resource.findOneAndUpdate({ _id: req.params.id }, attrs, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        if (!req.currentUser.canEdit(item)) return response.sendForbidden(res);
        res.json(item);
    });
};

exports.delete = async function (req, res) {
  Resource.deleteOne({ _id: req.params.id }, async function (err, item) {
    res.json({ message: 'Item successfully deleted' });
  });
};

exports.read = function (req, res) {
  Resource.findById(req.params.id, function (err, item) {
    if (err) return response.sendNotFound(res);
    res.json(item);
  });
};