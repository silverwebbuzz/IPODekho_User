const express = require("express");
const router = express.Router();
const Profile = require("../../helper/Profile/profile");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/updateProfile", upload.single("photoURL"), Profile.UpdateProfile);
router.get("/GetSingleUser/:id", Profile.getProfile);
router.post("/otpSend", Profile.otpSend);

module.exports = {
  router,
};
