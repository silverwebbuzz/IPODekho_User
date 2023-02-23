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
/**
 *firebase Credential Connect
 */
admin.initializeApp({
  credential: admin.credential.cert(CREDENTIALS),
  storageBucket: "gs://ipodekho-19fc1.appspot.com",
});
var bucket = admin.storage().bucket();
/**
 * The following contains for a All IPO API Routes.
 */
const homeRoute = require("./src/routes/mainlineRoute");
const offerRoute = require("./src/routes/OfferIPO/OfferIPORoute");
const newsRoute = require("./src/routes/NewsIPO/newsRoute");
const profile = require("./src/routes/Profile/ProfileRoute");
const contact = require("./src/routes/ContactIPO/contactRoute");
const faq = require("./src/routes/FaqIPO/faqRoute");
const privacyPolicy = require("./src/routes/PrivacyPolicyIPO/PrivacyPolicyRoute");
const termsAndCondition = require("./src/routes/TermsAndConditionIPO/TermsAndConditionRoute");
const ipoAllotmentTips = require("./src/routes/ipoAllotmentTips/ipoAllotmentTipsRoute");
webApp.use(homeRoute.router);
webApp.use(offerRoute.router);
webApp.use(newsRoute.router);
webApp.use(profile.router);
webApp.use(contact.router);
webApp.use(faq.router);
webApp.use(privacyPolicy.router);
webApp.use(termsAndCondition.router);
webApp.use(ipoAllotmentTips.router);
/**
 *server running this port.
 */
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
