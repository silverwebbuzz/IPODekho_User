const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const Faqs = firestore.collection("Faqs");
/**
 * The following Api contains source code for a  GetAll Faqs-IPo.
 */
const GetAllFaqs = async (req, res) => {
  try {
    const GetFaq = await Faqs.select("id", "faq").get();
    if (GetFaq) {
      const GetAllFaqs = GetFaq.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res
        .status(200)
        .send({ msg: "Get All Faqs Successfully", data: GetAllFaqs[0] });
    } else {
      res.status(300).send({ msg: "Faqs Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/**
 * The following Api contains source code for a  Get Single Faq-IPo.
 */
const GetSingleFaqs = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await Faqs.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const faq = Data.faq;
          const id = doc.id;
          usersArray.push(doc.data());
          const FaqData = {
            id,
            faq,
          };
          res.status(200).send({
            msg: "Get Single Faqs Successfully",
            GetSingleFaq: FaqData,
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
    res.status(400).send({ msg: "Faq Not Found" });
  }
};
module.exports = {
  GetAllFaqs,
  GetSingleFaqs,
};
