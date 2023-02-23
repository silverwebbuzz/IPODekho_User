const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const IPOAllotmentTips = firestore.collection("IPOAllotmentTips");
/**
 * The following Api contains source code for a  Get AllotmentTips.
 */
const GetAllotmentTips = async (req, res) => {
  try {
    const GetTips = await IPOAllotmentTips.select("id", "AllotmentTips").get();
    if (GetTips) {
      const GetAllGetTips = GetTips.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send({
        msg: "Get All AllotmentTips Successfully",
        data: GetAllGetTips,
      });
    } else {
      res.status(300).send({ msg: "AllotmentTips Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a  Get Single AllotmentTips.
 */
const GetSingleAllotmentTips = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await IPOAllotmentTips.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const AllotmentTips = Data.AllotmentTips;
          const id = doc.id;
          usersArray.push(doc.data());
          const NewsData = {
            id,
            AllotmentTips,
          };
          res.status(200).send({
            msg: "Get Single AllotmentTips Successfully",
            GetSingleAllotmentTips: NewsData,
          });
        }
      });
      let Condition = true;
      snapshot.forEach((doc) => {
        if (doc.id !== id && True && Condition) {
          Condition = false;
          res.status(400).send({
            msg: "AllotmentTips Not Found ",
          });
        }
      });
    });
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
module.exports = {
  GetAllotmentTips,
  GetSingleAllotmentTips,
};
