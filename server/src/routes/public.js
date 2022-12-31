import express from "express";

import publicC from "../controllers/public";

const routes = express.Router({ mergeParams: true });

routes.route("/categories").get(publicC.categories);
routes.route("/categories/details").get(publicC.detailCategories);
routes.route("/resources").get(publicC.resources);

module.exports = routes;
