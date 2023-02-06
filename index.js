const express = require("express");
const bodyParser = require("body-parser");
let admin = require("firebase-admin");
require("dotenv").config();

const webApp = express();
const cors = require("cors");
const CREDENTIALS = require("./src/config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
webApp.use(
  express.urlencoded({
    extended: true,
  })
);
webApp.use(express.json());
webApp.use(bodyParser.json());
webApp.use(bodyParser.json({ limit: "50mb" }));
webApp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
webApp.use(cors());

const PORT = process.env.PORT || 6000;
admin.initializeApp({
  credential: admin.credential.cert(CREDENTIALS),
  storageBucket: "gs://ipodekho-19fc1.appspot.com",
});
var bucket = admin.storage().bucket();

const homeRoute = require("./src/routes/mainlineRoute");
const offerRoute = require("./src/routes/OfferIPO/OfferIPORoute");
const newsRoute = require("./src/routes/NewsIPO/newsRoute");
const profile = require("./src/routes/Profile/ProfileRoute");
webApp.use(homeRoute.router);
webApp.use(offerRoute.router);
webApp.use(newsRoute.router);
webApp.use(profile.router);
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
