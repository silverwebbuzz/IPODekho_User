// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcmb_bZiVnFwzGw3vRlGpSdikk72ZCbf4",
  authDomain: "ipodekho-19fc1.firebaseapp.com",
  projectId: "ipodekho-19fc1",
  storageBucket: "ipodekho-19fc1.appspot.com",
  messagingSenderId: "931102543499",
  appId: "1:931102543499:web:01c01b8e86983e8ccf4e8e",
  measurementId: "G-02SPCQPKDD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = {
  firebase,
};
