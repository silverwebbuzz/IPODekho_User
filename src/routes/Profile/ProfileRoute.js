const express = require("express");
const router = express.Router();
const Profile = require("../../helper/Profile/profile");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/updateProfile", upload.single("photoURL"), Profile.UpdateProfile);
router.post("/register", Profile.createProfile);
router.post("/login", Profile.login);
router.get("/GetSingleUser", Profile.getProfile);
router.post("/otpSend", Profile.otpSend);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
