const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const Offers = firestore.collection("Offers");

const GetAllOffer = async (req, res) => {
  try {
    const LiveIpo = await Offers.select(
      "id",
      "offerStatus",
      "offerTitle",
      "offerSequence",
      "offerDescription"
    ).get();
    const liveIpo = LiveIpo.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (liveIpo.length > 0) {
      res.status(200).send({ msg: "Get IPO Successfully", liveIpo });
    } else {
      res.status(300).send({ msg: "IPO Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

const GetIdByOffers = async (req, res) => {
  try {
    const id = req.params.id;
    // const CategoryForIPOS = req.body.CategoryForIPOS;
    var usersArray = [];
    let True = true;
    const data = await Offers
      // .where("CategoryForIPOS", "==", CategoryForIPOS)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id == id && True) {
            True = false;
            const Data = doc.data();
            const id = doc.id;
            const offerStatus = Data.offerStatus;
            const offerTitle = Data.offerTitle;
            const offerSequence = Data.offerSequence;
            const offerDescription = Data.offerDescription;
            usersArray.push(doc.data());
            const Offer = {
              id,
              offerStatus,
              offerTitle,
              offerSequence,
              offerDescription,
            };
            res.status(200).send({
              msg: "Offer Get Successfully ",
              Data: Offer,
            });
          }
        });
        let Condition = true;
        snapshot.forEach((doc) => {
          if (doc.id !== id && True && Condition) {
            Condition = false;
            res.status(400).send({
              msg: "User Not Found",
            });
          }
        });
      });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
module.exports = {
  GetAllOffer,
  GetIdByOffers,
};
