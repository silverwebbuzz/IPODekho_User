const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const privacyPolicy = firestore.collection("PrivacyPolicy");
/**
 * The following Api contains source code for a  Get All Privacy-policy .
 */
const AllPrivacyPolicy = async (req, res) => {
  try {
    const GetPrivacy = await privacyPolicy.select("id", "PrivacyPolicy").get();
    if (GetPrivacy) {
      const GetAllPrivacyPolicy = GetPrivacy.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send({
        msg: "Get All privacyPolicy Successfully",
        data: GetAllPrivacyPolicy,
      });
    } else {
      res.status(300).send({ msg: "privacyPolicy Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};
/**
 * The following Api contains source code for a  Get Single Privacy-policy .
 */
const SinglePrivacyPolicy = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await privacyPolicy.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const PrivacyPolicy = Data.PrivacyPolicy;
          const id = doc.id;
          usersArray.push(doc.data());
          const privacyPolicyData = {
            id,
            PrivacyPolicy,
          };
          res.status(200).send({
            msg: "Get Single privacyPolicy Successfully",
            GetSinglePrivacy: privacyPolicyData,
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
    res.status(400).send({ msg: "privacyPolicy Not Found" });
  }
};
module.exports = {
  AllPrivacyPolicy,
  SinglePrivacyPolicy,
};
