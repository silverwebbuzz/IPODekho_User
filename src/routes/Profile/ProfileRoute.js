const express = require("express");
const router = express.Router();
const Profile = require("../../helper/Profile/profile");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/updateProfile", upload.single("file"), Profile.UpdateProfile);
router.post("/register", Profile.createProfile);
router.post("/login", Profile.login);
router.post("/logout", Profile.signout);
router.post("/GetSingleUser", Profile.GetSingleUser);
// router.post("/sendOtp", Profile.sendOtp);
router.post("/ResetPassword", Profile.resetPassword);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
