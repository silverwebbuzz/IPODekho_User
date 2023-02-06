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
const nodemailer = require("nodemailer");
const {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} = require("firebase/auth");
const { profile } = require("console");
const { auth } = require("firebase-admin");

/* 
UpDate Profile 
**/
const UpdateProfile = async (req, res, body) => {
  try {
    if (req.file) {
      const id = req.body.id;
      delete req.body.id;
      const GetIpo = userInformation.doc(id);

      const GetData = await GetIpo.get();
      const name = saltedMd5(req.file.originalname, "SUPER-S@LT!");
      const fileName = name + path.extname(req.file.originalname);
      const file = `https://firebasestorage.googleapis.com/v0/b/ipodekho-19fc1.appspot.com/o/${fileName}?alt=media&token=11c648b5-a554-401c-bc4e-ba9155f29744`;
      const IPOUser = {
        firstName: req.body.firstName || "",
        // id: req.body.id || "",
        lastName: req.body.lastName || "",
        phone: req.body.phone || "",
        createdAt: new Date(),
        file: file,
        id: id,
      };
      const data = IPOUser;
      if (GetData.exists) {
        //   const auth = admin
        //     .auth()
        //     .updateUser(
        //       { uid: id },
        //       {
        //         email: req.body.email,
        //       }
        //     )
        //     .then((data) => {
        //       const user = userInformation.doc(data.uid).set({
        //         firstName: req.body.firstName || "",
        //         lastName: req.body.lastName || "",
        //         email: req.body.email || "",
        //         phone: req.body.phone || "",
        //         createdAt: new Date(),
        //         file: file,
        //         id: id,
        //       });
        //       const ProfileData = {
        //         email: data.email,
        //         id: data.uid,
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         phone: user.phone,
        //         file: user.file,
        //       };
        //       return res.status(201).send({
        //         msg: "register Updated SuccessFully",
        //         data: ProfileData,
        //       });
        //     })
        //     .catch(function (error) {
        //       let errorcode = error.code;
        //       let errorMessage = error.message;
        //       if (errorcode == "auth/weak-password") {
        //         return res.status(500).json({ error: errorMessage });
        //       } else {
        //         return res.status(500).json({ error: errorMessage });
        //       }
        //     });
        await userInformation.doc(id).update(data, { new: true });
        res.status(200).send({ msg: "Ipo updated Successfully", data: data });
      } else {
        res.status(300).send({ msg: "UserId Not Found" });
      }
    } else {
      const id = req.body.id;
      delete req.body.id;
      const GetIpo = userInformation.doc(id);

      const GetData = await GetIpo.get();
      const IPOUser = {
        firstName: req.body.firstName || "",
        // id: req.body.id || "",
        lastName: req.body.lastName || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        createdAt: new Date(),
        id: id,
      };
      const data = IPOUser;
      // if (GetData.exists) {
      //   await userInformation.doc(id).update(data, { new: true });
      //   res.status(200).send({ msg: "Ipo updated Successfully", data: data });
      // } else {
      //   res.status(300).send({ msg: "UserId Not Found" });
      // }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send({ msg: "User Not Found" });
  }
};
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
  // import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  const email = req.body.email;
  const password = req.body.password;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      return res.status(201).send({ msg: "Sign-UP SuccessFully", data: user });
      // console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(401).send(errorMessage);
    });
};

/* 
GetBYSingle User 
**/
const GetSingleUser = async (req, res) => {
  try {
    const id = req.body.id;
    var usersArray = [];
    let True = true;
    const data = await userInformation.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          usersArray.push(doc.data());
          const firstName = Data.firstName;
          console.log(firstName);
          const file = Data.file;
          const lastName = Data.lastName;
          const email = Data.email;
          const phone = Data.phone;
          const id = doc.id;

          const UserData = {
            id,
            firstName,
            email,
            phone,
            lastName,
            file,
          };
          res.status(200).send({
            msg: "Get Single User Successfully",
            GetSingleUser: UserData,
          });
        }
      });
      let Condition = true;
      snapshot.forEach((doc) => {
        if (doc.id !== id && True && Condition) {
          Condition = false;
          res.status(400).send({
            msg: "User Not Found ",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/* 
SignOut User
**/

const signout = (req, res) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      return res.status(201).send({ msg: "Sign Out Successfully" });
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      res.status(401).send(error);
    });
};

/*send Otp **/

// const sendOtp = async (req, res) => {
//   const otp = Math.floor(1000 + Math.random() * 9000).toString();
//   const id = req.body.id;
//   const GetIpo = userInformation.doc(id);
//   const GetData = await GetIpo.get();
//   var usersArray = [];

//   await userInformation.get(id).then((snapshot) => {
//     snapshot.forEach((doc) => {
//       const Data = doc.data(usersArray.id);
//       const email1 = Data.email;
//       const email = req.body.email;
//       if (email1 === email) {
//         const transport = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "ashish.swb1234@gmail.com",
//             pass: "oveprfbiugcfpoin",
//             secure: true,
//           },
//         });
//         const mailOptions = {
//           from: "ashish.swb1234@gmail.com",
//           to: email,
//           subject: "Your OTP",
//           text: `Your OTP is ${otp}.`,
//         };
//         try {
//           transport.sendMail(mailOptions);
//           userInformation.collection("otp").doc(email).set({
//             email: email,
//             otp: otp,
//           });
//           return res.send({
//             status: "success",
//             message: "OTP has been sent to the provided email.",
//           });
//         } catch (e) {
//           console.log(e);
//           return res.json({
//             status: "failed",
//             message: "Unable to send email at the momment",
//           });
//         }
//       } else {
//         res.status(301).send("Email not found");
//       }
//     });
//   });
// };
// const auth = getAuth();
// const email = req.body.email;
// sendPasswordResetEmail(auth, email)
//   .then(() => {
//     // Password reset email sent!
//     console.log("sent");
//     // ..
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
// try {
//   const otp = Math.floor(1000 + Math.random() * 9000).toString();
//   const mailOptions = {
//     to: req.body.email,
//     subject: otp,
//     html: `<p>Your OTP is: ${otp}</p>`,
//   };
//   admin.auth().sendEmailVerification(mailOptions);
//   console.log("OTP sent to email!");
// } catch (error) {
//   console.error("Error sending OTP to email:", error);
// }

/* 
Resat Password
**/
const resetPassword = (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      return res.status(201).send({ msg: "Password Reset Email Sent" });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return res.status(300).send(error);
      // ..
    });
};

// const password = req.body.password;
// const aa = await admin
//   .auth()
//   .getUserByEmail(req.body.email)
//   // .then(function (userRecord) {
//   //   userInformation.doc(userRecord.uid).get();
//   //   console.log(aa);
//   // })
//   .then(function (userRecord) {
//     var user = userRecord;
//     return admin.auth().createCustomToken(user.uid);
//   })
//   .then((data) => {
//     const user = new userInformation.where("password", "==", password).get();
//     console.log(user);
//     const pass = user.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     if (pass.length > 0) {
//       return res
//         .status(201)
//         .send({ msg: "Sign-UP SuccessFully", data: data });
//     } else {
//       res.status(401).send("Invalid email or password");
//     }
//   })
//   .catch(function (error) {
//     console.error("Error:", error);
//     res.status(401).send("Invalid email or password");
//   });

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
  signout,
  GetSingleUser,
  resetPassword,
  // sendOtp,
};
