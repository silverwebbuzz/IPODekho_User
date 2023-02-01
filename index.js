const express = require("express");

const webApp = express();
const cors = require("cors");

webApp.use(
  express.urlencoded({
    extended: true,
  })
);
webApp.use(express.json());
webApp.use(cors());

const PORT = process.env.PORT || 6000;

const homeRoute = require("./src/routes/mainlineRoute");
const offerRoute = require("./src/routes/OfferIPO/OfferIPORoute");
const newsRoute = require("./src/routes/NewsIPO/newsRoute");

webApp.use(homeRoute.router);
webApp.use(offerRoute.router);
webApp.use(newsRoute.router);
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
