const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const News = firestore.collection("News");
/**
 * The following Api contains source code for a  GetAll News With Selected Field Get Data.
 */
const GetAllNews = async (req, res) => {
  try {
    const GetNews = await News.select(
      "id",
      "Date",
      "Title",
      "Content",
      "file",
      "url"
    ).get();
    if (GetNews) {
      const GetAllNews = GetNews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res
        .status(200)
        .send({ msg: "Get All News Successfully", data: GetAllNews });
    } else {
      res.status(300).send({ msg: "News Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/**
 * The following Api contains source code for a  Get Single News With Selected Field Get Data.
 */
const GetSingleNews = async (req, res) => {
  try {
    const id = req.params.id;
    var usersArray = [];
    let True = true;
    const data = await News.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id && True) {
          True = false;
          const Data = doc.data(usersArray.id);
          const Content = Data.Content;
          const file = Data.file;
          const Date = Data.Date;
          const Title = Data.Title;
          const id = doc.id;
          const url = Data.url;
          usersArray.push(doc.data());
          const NewsData = {
            id,
            Content,
            Date,
            Title,
            file,
            url,
          };
          res.status(200).send({
            msg: "Get Single News Successfully",
            GetSingleNews: NewsData,
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
    res.status(400).send({ msg: "Offer Not Found" });
  }
};
module.exports = {
  GetAllNews,
  GetSingleNews,
};
