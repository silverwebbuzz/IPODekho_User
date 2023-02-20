const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../../config/firestoreCloud");

const News = firestore.collection("News");

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

/* 
Get All News
**/

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
          const url = Data.url;
          const id = doc.id;
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
