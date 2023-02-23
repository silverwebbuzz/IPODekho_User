const express = require("express");
const router = express.Router();
const Multer = require("multer");
const mainlineIpo = require("../helper/GetIPO/MainLineAndSmeIPO");

router.post("/GetMainLineIpo", mainlineIpo.GetIpo);
router.post("/GetIdByMainLineIpo/:id", mainlineIpo.GetIdByMainLineIpo);
// router.post("/GetIdByMainLineIpo/:id", mainlineIpo.GetIdByMainLineIpo);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
