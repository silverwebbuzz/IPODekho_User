const express = require("express");
const router = express.Router();
const privacyPolicy = require("../../helper/privacypolicyIPO/privacypolicyIPO");

router.post("/AllPrivacyPolicy", privacyPolicy.AllPrivacyPolicy);
router.post("/SinglePrivacyPolicy/:id", privacyPolicy.SinglePrivacyPolicy);

module.exports = {
  router,
};
