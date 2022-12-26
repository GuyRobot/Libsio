import mongoose from "mongoose";
import response from "../helpers/response";

import _ from 'underscore';
const Category = mongoose.model("Category");
const Resource = mongoose.model("Resource");

exports.categories = function (req, res) {
    Category.find({}).exec(function (err, docs) {
        if (err) return response.sendNotFound(res);
        res.json(docs);
    });
};

exports.detailCategories = async function (req, res) {
  let results = await Resource.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { category: "$_id", count: 1, _id: 0 } },
  ]).exec();

  Category.populate(results, { path: "category" }, function (err, docs) {
    if (err) return response.sendNotFound(res);
    res.json(docs);
  });
};