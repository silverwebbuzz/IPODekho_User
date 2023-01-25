const express = require("express");
const router = express.Router();
const Multer = require("multer");
const mainlineIpo = require("../helper/MainLineIpo");

router.get("/GetMainLineIpo", mainlineIpo.GetMainLineIpo);
router.get("/GetIdByMainLineIpo/:id", mainlineIpo.GetIdByMainLineIpo);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
