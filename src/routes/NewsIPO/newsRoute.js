const express = require("express");
const router = express.Router();
const newsIPO = require("../../helper/NewsIPO/NewsIPO");

router.post("/GetAllNews", newsIPO.GetAllNews);
router.post("/GetISingleNews/:id", newsIPO.GetSingleNews);

module.exports = {
  router,
};
