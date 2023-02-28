const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const saltedMd5 = require("salted-md5");
const path = require("path");
var admin = require("firebase-admin");
const userInformation = firestore.collection("Profile");

/**
 * The following Api contains source code for a User In Updated Profile .
 */
const UpdateProfile = async (req, res, body) => {
  try {
    if (req.file) {
      const uid = req.body.id;
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          photoURL: file,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
        })
        .then((data) => {
          if (data) {
            return res.status(201).send({
              msg: "Profile Updated SuccessFully",
              data: data,
            });
          } else {
            return res.status(300).send({
              msg: "The user with the provided phone number Already exists",
            });
          }
        }).catch((error) => {
          return res.status(400).send({
            msg: error.errorInfo.code,
          });
        });
    } else {
      const uid = req.body.id;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Profile Updated SuccessFully",
            data: data,
          });
        })
       .catch((error) => {
          return res.status(400).send({
            msg: error.errorInfo.code,
          });
        });
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a User Get  .
 */
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    admin
      .auth()
      .getUser(id)
      .then((user) => {
        console.log(user);
        const photoURL = user.photoURL;
        const displayName = user.displayName;
        const phoneNumber = user.phoneNumber;
        const email = user.email;
        const GetSingleProfile = {
          photoURL: photoURL,
          displayName: displayName,
          phoneNumber: phoneNumber,
          email: email,
        };
        return res.status(201).send({
          msg: "Get Single User SuccessFully",
          data: GetSingleProfile,
        });
      })
      .catch((error) => {
        res.status(300).send({ msg: error.message });
      });
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Sent Otp With Google authentication Phone-Number
**/
const otpSend = async (req, res) => {
  try {
    const accountSid = "AC6950572b103e85e91b571d103feb8e14";
    const authToken = "c8ecef804675e4c4ff43ded4e016cc23";
    const client = require("twilio")(accountSid, authToken);
    const otp = generateRandomOTP();
    const phone = req.body.phoneNumber;
    client.messages.create(
      {
        to: "+919327152685",
        from: "+919327152685",
        body: `Your OTP is ${otp}`,
      },
      function (err, message) {
        if (err) {
          console.error(err);
        } else {
          console.log(`OTP sent: ${message.sid}`);
        }
      }
    );
    function generateRandomOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

module.exports = {
  UpdateProfile,
  getProfile,
  otpSend,
};
