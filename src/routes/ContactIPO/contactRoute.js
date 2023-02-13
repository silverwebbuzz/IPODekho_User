const express = require("express");
const router = express.Router();
const contact = require("../../helper/ContactIPO/ContactIPO");

router.post("/createContact", contact.createContact);

module.exports = {
  router,
};
