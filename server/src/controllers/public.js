import mongoose from "mongoose";
import response from "../helpers/response";

import _ from 'underscore';
const Category = mongoose.model("Category");

exports.categories = function (req, res) {
    Category.find({}).exec(function (err, docs) {
        if (err) return response.sendNotFound(res);
        res.json(docs);
    });
};