const express = require("express");
const router = express.Router();
const IPOAllotmentTips = require("../../helper/ipoAllotmentTips/ipoAllotmentTips");

router.post("/GetAllotmentTips", IPOAllotmentTips.GetAllotmentTips);
router.post(
  "/GetSingleAllotmentTips/:id",
  IPOAllotmentTips.GetSingleAllotmentTips
);

module.exports = {
  router,
};
