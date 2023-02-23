const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const TermsAndCondition = firestore.collection("TermsAndConditions");
/**
 * The following Api contains source code for a Get All TermsAndCondition .
 */
const GetAllTermsAndCondition = async (req, res) => {
  try {
    const termsAndConditions = await TermsAndCondition.select(
      "id",
      "termsAndCondition"
    ).get();
    const GetAll = termsAndConditions.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (GetAll.length > 0) {
      res
        .status(200)
        .send({ msg: "Get TermsAndConditions Successfully", GetAll });
    } else {
      res.status(300).send({ msg: "TermsAndCondition Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a Get Single TermsAndCondition .
 */
const GetSingleTermsAndCondition = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await TermsAndCondition.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id == id && True) {
          True = false;
          const Data = doc.data();
          const id = doc.id;
          const termsAndCondition = Data.termsAndCondition;
          usersArray.push(doc.data());
          const Offer = {
            id,
            termsAndCondition,
          };
          res.status(200).send({
            msg: "TermsAndCondition Get Successfully ",
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
  GetAllTermsAndCondition,
  GetSingleTermsAndCondition,
};
