const express = require("express");
const router = express.Router();
const faqIPO = require("../../helper/faqIPO/faqIPO");

router.get("/GetAllFaqs", faqIPO.GetAllFaqs);
router.get("/GetISingleFaq/:id", faqIPO.GetSingleFaqs);

module.exports = {
  router,
};
