const express = require("express");
const router = express.Router();
const offerIPO = require("../../helper/OffersIPO/OfferIPO");

router.post("/GetAllOffer", offerIPO.GetAllOffer);
router.post("/GetIdByOffers/:id", offerIPO.GetIdByOffers);
// router.post("/uploadImage", FIREBASE_API.uploadFile);

module.exports = {
  router,
};
