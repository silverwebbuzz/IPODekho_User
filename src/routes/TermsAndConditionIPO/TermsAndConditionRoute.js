const express = require("express");
const router = express.Router();
const Multer = require("multer");
const termsAndCondition = require("../../helper/TermsAndCondition/TermsAndCondition");

router.post(
  "/GetAllTermsAndCondition",
  termsAndCondition.GetAllTermsAndCondition
);
router.post(
  "/GetSingleTermsAndCondition/:id",
  termsAndCondition.GetSingleTermsAndCondition
);
// router.post("/GetIdByMainLineIpo/:id", mainlineIpo.GetIdByMainLineIpo);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
