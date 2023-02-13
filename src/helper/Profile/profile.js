const { firestore } = require("../../config/firestoreCloud");
const express = require("express");
const webApp = express();
const saltedMd5 = require("salted-md5");
const path = require("path");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
var admin = require("firebase-admin");
const { Query } = require("@google-cloud/firestore");
const userInformation = firestore.collection("Profile");
const base64 = require("base64-to-image");
const crypto = require("crypto");
const e = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const firebaseConfig = require("../../config/config");
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const { auth, signInWithPhoneNumber } = require("firebase/auth");
const { log } = require("console");
/* 
UpDate Profile With Google authentication 
**/
const UpdateProfile = async (req, res, body) => {
  try {
    if (req.file) {
      const uid = req.body.id;
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      // Update the user's profile information
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          photoURL: file,
          phoneNumber: req.body.phoneNumber,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          res.status(300).send({ msg: "UserId Not Found" });
        });
    } else {
      const uid = req.body.id;
      admin
        .auth()
        .updateUser(uid, {
          displayName: req.body.displayName,
          phoneNumber: req.body.phoneNumber,
        })
        .then((data) => {
          return res.status(201).send({
            msg: "Updated SuccessFully",
            data: data,
          });
        })
        .catch((error) => {
          res.status(300).send({ msg: "UserId Not Found" });
        });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* 
Get Single Profile With Google authentication 
**/
const getProfile = async (req, res) => {
  try {
    const id = req.body.id;
    admin
      .auth()
      .getUser(id)
      .then((user) => {
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
        console.error("Error retrieving user:", error);
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
    // Phone number to send the OTP to

    // Generate a random OTP
    const otp = generateRandomOTP();

    const phone = req.body.phoneNumber;
    // Send the OTP via SMS using Twilio
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

// if (req.file) {
//   const id = req.body.id;
//   delete req.body.id;
//   const GetIpo = userInformation.doc(id);

//   const GetData = await GetIpo.get();
//   const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
//   const fileName = name + path.extname(req.file.originalname);
//   const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
//   const IPOUser = {
//     firstName: req.body.firstName || "",
//     // id: req.body.id || "",
//     lastName: req.body.lastName || "",
//     email: req.body.email || "",
//     phone: req.body.phone || "",
//     createdAt: new Date(),
//     file: file,
//     id: id,
//   };
//   const data = IPOUser;
//   if (GetData.exists) {
//     //   const auth = admin
//     //     .auth()
//     //     .updateUser(
//     //       { uid: id },
//     //       {
//     //         email: req.body.email,
//     //       }
//     //     )
//     //     .then((data) => {
//     //       const user = userInformation.doc(data.uid).set({
//     //         firstName: req.body.firstName || "",
//     //         lastName: req.body.lastName || "",
//     //         email: req.body.email || "",
//     //         phone: req.body.phone || "",
//     //         createdAt: new Date(),
//     //         file: file,
//     //         id: id,
//     //       });
//     //       const ProfileData = {
//     //         email: data.email,
//     //         id: data.uid,
//     //         firstName: user.firstName,
//     //         lastName: user.lastName,
//     //         phone: user.phone,
//     //         file: user.file,
//     //       };
//     //       return res.status(201).send({
//     //         msg: "register Updated SuccessFully",
//     //         data: ProfileData,
//     //       });
//     //     })
//     //     .catch(function (error) {
//     //       let errorcode = error.code;
//     //       let errorMessage = error.message;
//     //       if (errorcode == "auth/weak-password") {
//     //         return res.status(500).json({ error: errorMessage });
//     //       } else {
//     //         return res.status(500).json({ error: errorMessage });
//     //       }
//     //     });
//     await userInformation.doc(id).update(data, { new: true });
//     res.status(200).send({ msg: "Ipo updated Successfully", data: data });
//   } else {
//     res.status(300).send({ msg: "UserId Not Found" });
//   }
// } else {
//   const id = req.body.id;
//   delete req.body.id;
//   const GetIpo = userInformation.doc(id);

//   const GetData = await GetIpo.get();
//   const IPOUser = {
//     firstName: req.body.firstName || "",
//     // id: req.body.id || "",
//     lastName: req.body.lastName || "",
//     email: req.body.email || "",
//     phone: req.body.phone || "",
//     createdAt: new Date(),
//     id: id,
//   };
//   const data = IPOUser;
//   // if (GetData.exists) {
//   //   await userInformation.doc(id).update(data, { new: true });
//   //   res.status(200).send({ msg: "Ipo updated Successfully", data: data });
//   // } else {
//   //   res.status(300).send({ msg: "UserId Not Found" });
//   // }
// }
//   } catch (error) {
//     console.log(error, "error");
//     res.status(400).send({ msg: "User Not Found" });
//   }
// };
// try {
//   if (req.file) {
//     const id = req.body.id;
//     delete req.body.id;
//     const GetIpo = userInformation.doc(id);
//     const GetData = await GetIpo.get();
//     const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
//     const fileName = name + path.extname(req.file.originalname);
//     const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
//     const IPOUser = {
//       firstName: req.body.firstName || "",
//       // id: req.body.id || "",
//       lastName: req.body.lastName || "",
//       email: req.body.email || "",
//       phone: req.body.phone || "",
//       createdAt: new Date(),
//       file: file,
//       id: id,
//     };

//     console.log("file");
//     if (GetData.exists) {
//       console.log("IPOUser");
//       const aa = await userInformation.doc(id).update(IPOUser, { new: true });
//       console.log(aa);
//       if (aa.id == id) {
//         console.log("found");
//       } else {
//         console.log("not found");
//       }
//       // res.status(200).send({
//       //   msg: "Profile Updated Successfully",
//       //   data: IPOUser,
//       // });
//       // await userInformation
//       //   .where("id", "==", IPOUser.id)
//       //   .get()
//       // .then((snapshot) => {
//       //   if (snapshot.empty) {
//       //     console.log("1");
//       //     // userInformation.add(IPOUser);
//       //     res.status(300).send({
//       //       msg: "User Not Found",
//       //     });
//       //   } else {
//       //     console.log("2");
//       //     userInformation.doc(IPOUser.id).update(IPOUser, { new: true });
//       //     res.status(200).send({
//       //       msg: "Profile Created Successfully",
//       //       data: IPOUser,
//       //     });
//       //   }
//       // });
//     } else {
//       res.status(300).send({
//         msg: "User Not Updated",
//       });
//     }
//   } else {
//     if (IPOUser) {
//       const IPOUser = {
//         firstName: req.body.firstName || "",
//         lastName: req.body.lastName || "",
//         email: req.body.email || "",
//         id: req.body.id || "",
//         phone: req.body.phone || "",
//         createdAt: new Date(),
//       };
//       await userInformation
//         .where("id", "==", IPOUser.id)
//         .get()
//         .then((snapshot) => {
//           if (snapshot.empty) {
//             // userInformation.add(IPOUser);
//             res.status(300).send({
//               msg: "User Not Found",
//             });
//           } else {
//             userInformation.doc(IPOUser.id).update(IPOUser, { new: true });
//             res.status(200).send({
//               msg: "Profile Created Successfully",
//               data: IPOUser,
//             });
//           }
//         });
//     }
//     //  ({ ignoreUndefinedProperties: true })
//     else {
//       console.log("xyz");
//       res.status(300).send({ msg: "Profile Not Found" });
//     }
//   }
//   webApp.locals.bucket = admin.storage().bucket();
// } catch (error) {
//   console.log(error, "error");
//   res.status(400).send(error);
// }

/* 
Register Form
**/
const createProfile = async (req, res) => {
  const auth = admin
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
    })
    .then((data) => {
      const user = userInformation.doc(data.uid).set({
        email: req.body.email,
        password: req.body.password,
        id: data.uid,
      });
      const ProfileData = {
        email: data.email,
        id: data.uid,
      };
      return res
        .status(201)
        .send({ msg: "Sign-UP SuccessFully", data: ProfileData });
    })
    .catch(function (error) {
      let errorcode = error.code;
      let errorMessage = error.message;
      if (errorcode == "auth/weak-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
  // const salt = await bcrypt.genSalt(10);
  // // const password = await bcrypt.hash(req.body.password, salt);
  // // console.log(password);
  // const createUser = {
  //   email: req.body.email,
  //   password: await bcrypt.hash(req.body.password, salt),
  //   createdAt: new Date(),
  // };
  // const checkEmail = await userInformation
  //   .where("email", "==", createUser.email)
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.empty) {
  //       userInformation.add(createUser);
  //       res.status(200).send({
  //         msg: "Profile Created Successfully",
  //         data: createUser,
  //       });
  //     } else {
  //       res.status(300).send({
  //         msg: "Email Already Exist",
  //       });
  //     }
  //   });
};

/* 
Login 
**/
const login = async (req, res) => {
  const password = req.body.password;
  const aa = await admin
    .auth()
    .getUserByEmail(req.body.email)
    // .then(function (userRecord) {
    //   userInformation.doc(userRecord.uid).get();
    //   console.log(aa);
    // })
    .then(function (userRecord) {
      var user = userRecord;
      return admin.auth().createCustomToken(user.uid);
    })
    .then((data) => {
      const user = new userInformation.where("password", "==", password);
      console.log(user);
      const pass = user.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (pass.length > 0) {
        return res
          .status(201)
          .send({ msg: "Sign-UP SuccessFully", data: data });
      } else {
        res.status(401).send("Invalid email or password");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      res.status(401).send("Invalid email or password");
    });
};

// if (!admin.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const email = req.body.email;

// const password = req.body.password;

// firebaseAuth
//   .signInWithEmailAndPassword(auth, email.value, password.value)
//   .then(function (userCredential) {
//     console.log(userCredential);
//     const user = userCredential.user;
//     console.log(user);
//     console.log("User signed in:", user.uid);
//   })
//   .catch(function (error) {
//     console.error("Error:", error.message);
//   });
// var email = req.body.email;
// var password = req.body.password;

// admin
//   .auth()
//   .getUserByEmail(email)
//   .then(function (userRecord) {
//     var user = userRecord;

//     return admin.auth().createCustomToken(user.uid);
//   })
//   .then(function (customToken) {
//     res.send({ msg: "Login SuccessFully", token: customToken });
//   })
//   .catch(function (error) {
//     console.error("Error:", error);
//     res.status(401).send("Invalid email or password");
//   });

// if (Match.length > 0) {
//   console.log(token, "token");
//   if (await bcrypt.compare(password, Match.password)) {
//     res.status(200).send({
//       msg: "Login Successfully",
//       data: token,
//     });
//   } else {
//     res.status(300).send({
//       msg: "Invalid Credentials",
//     });
//   }
// } else {
//   res.status(300).send({
//     msg: "User Not Found",
//   });
// }

module.exports = {
  UpdateProfile,
  createProfile,
  login,
  getProfile,
  otpSend,
};
