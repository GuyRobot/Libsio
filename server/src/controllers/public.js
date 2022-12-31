import mongoose from "mongoose";
import response from "../helpers/response";
import request from '../helpers/request';
import pagination from '../helpers/pagination';
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

exports.resources = async function (req, res) {
  const queryRefs = [{ name: "category", model: "Category" }];
  let query = Object.assign({}, request.getFilteringOptions(req, ['name']));
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