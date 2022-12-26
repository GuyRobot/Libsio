import express from "express";

import publicC from "../controllers/public";

const routes = express.Router({ mergeParams: true });

routes.route("/categories").get(publicC.categories);

module.exports = routes;
