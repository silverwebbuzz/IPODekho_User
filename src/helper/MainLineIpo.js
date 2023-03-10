const { Firestore } = require("@google-cloud/firestore");
const CREDENTIALS = require("../config/ipodekho-19fc1-firebase-adminsdk-98o3u-1674a03d07.json");
const { firestore } = require("../config/firestoreCloud");

const userInformation = firestore.collection("MainLineIPO");
const messageCollection = firestore.collection("messageCollection");
const GetMessage = async (req, res) => {
  try {
    const message = await messageCollection.select("id");
    if (message) {
      const GetAll = message.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).send({ msg: "Get Successfully", data: GetAll });
    } else {
      res.status(300).send({ msg: " Not Found" });
    }
  } catch (error) {
    res.status(400).send({ msg: "User Not Found" });
  }
};

/* GetMainLineIpo  **/
const GetMainLineIpo = async (req, res) => {
  const CategoryForIPOS = req.body.CategoryForIPOS || "";
  const type = req.body.type || "";
  const LiveIpo = await userInformation
    .where("CategoryForIPOS", "==", CategoryForIPOS)
    .where("IPOStatus", "in", ["AllotmentOut", "WaitingAllotment", "Live"])
    .select(
      "companyName",
      "CategoryForIPOS",
      "IPOOpenDate",
      "IPOCloseDate",
      "lotSize",
      "GMPStatus",
      "GMP",
      "IPOStatus",
      "fromPrice",
      "toPrice",
      "file",
      "BSEScript",
      "ListingPrice",
      "closingPrice",
      "NSECode",
      "total",
      "disclaimer"
    )
    .get();
  const UpcomingIPO = await userInformation
    .where("CategoryForIPOS", "==", CategoryForIPOS)
    .where("IPOStatus", "==", "Upcoming")
    .select(
      "companyName",
      "CategoryForIPOS",
      "IPOOpenDate",
      "IPOCloseDate",
      "lotSize",
      "GMPStatus",
      "GMP",
      "IPOStatus",
      "fromPrice",
      "toPrice",
      "file",
      "BSEScript",
      "ListingPrice",
      "closingPrice",
      "NSECode",
      "total",
      "disclaimer"
    )
    .get();
  const ListedIPO = await userInformation
    .where(
      "CategoryForIPOS",
      "==",
      CategoryForIPOS,
      "&&",
      "IPOStatus",
      "==",
      "Listed"
    )
    .where("IPOStatus", "==", "Listed")
    .select(
      "companyName",
      "CategoryForIPOS",
      "IPOOpenDate",
      "IPOCloseDate",
      "lotSize",
      "GMPStatus",
      "GMP",
      "IPOStatus",
      "fromPrice",
      "toPrice",
      "file",
      "BSEScript",
      "listingPrice",
      "closingPrice",
      "NSECode",
      "total",
      "disclaimer"
    )
    .get();
  if (type === "") {
    const liveIpo = LiveIpo.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({ msg: "Get IPO Successfully", liveIpo });
  } else if (type === "Live") {
    const liveIpo = LiveIpo.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).send({ msg: "Get IPO Successfully", liveIpo });
  } else if (type === "Upcoming") {
    const upcomingIpo = UpcomingIPO.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get IPO Successfully", upcomingIpo });
  } else if (type === "Listed") {
    const listedIPO = ListedIPO.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({ msg: "Get IPO Successfully", listedIPO });
  } else {
    res.status(300).send({ msg: "IPO Not Found" });
  }
};

/* GetMainLineIpo By Single Id **/

const GetIdByMainLineIpo = async (req, res) => {
  try {
    const id = req.params.id;
    // const CategoryForIPOS = req.body.CategoryForIPOS;
    var usersArray = [];
    let True = true;
    const data = await userInformation
      // .where("CategoryForIPOS", "==", CategoryForIPOS)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id == id && True) {
            True = false;
            const Data = doc.data();
            // if (Data.CategoryForIPOS === CategoryForIPOS) {
            //MainLineIPO Genral
            const id = doc.id;
            const disclaimer = Data.disclaimer;
            const preIssueShareHolding = Data.preIssueShareHolding;
            const reatailQuota = Data.reatailQuota;
            const qibQuota = Data.qibQuota;
            const DRHPDraft = Data.DRHPDraft;
            const companyDescription = Data.companyDescription;
            const freshIssue = Data.freshIssue;
            const fromPrice = Data.fromPrice;
            const ObjectOfIssue = Data.ObjectOfIssue;
            const postIssueShareHolding = Data.postIssueShareHolding;
            const issueSize = Data.issueSize;
            const RHPDraft = Data.RHPDraft;
            const promotersName = Data.promotersName;
            const faceValue = Data.faceValue;
            const toPrice = Data.toPrice;
            const issueType = Data.issueType;
            const companyName = Data.companyName;
            const nilQuota = Data.nilQuota;
            const listingAt = Data.listingAt;
            const offerForSale = Data.offerForSale;
            const lotSize = Data.lotSize;
            //MainLineIPO Financial
            const earningPerShare = Data.earningPerShare;
            const peersComparison = Data.peersComparison;
            const financialLotsize = Data.financialLotsize;
            const returnonNetWorth = Data.returnonNetWorth;
            const companyFinancials = Data.companyFinancials;
            const netAssetValue = Data.netAssetValue;
            const earningPERatio = Data.earningPERatio;
            //MainLineIPO Subscription
            const sNII = Data.sNII;
            const others = Data.others;
            const total = Data.total;
            const subscriptionDetails = Data.subscriptionDetails;
            const retailInvestors = Data.retailInvestors;
            const qualifiedInstitutions = Data.qualifiedInstitutions;
            const employees = Data.employees;
            const bNII = Data.bNII;
            const nonInstitutionalBuyers = Data.nonInstitutionalBuyers;
            //MainLineIPO ListingInfo
            const scriptPosition = Data.scriptPosition;
            const closingDifferent = Data.closingDifferent;
            const listingDifferent = Data.listingDifferent;
            const BSEScript = Data.BSEScript;
            const closingPrice = Data.closingPrice;
            const ListingPrice = Data.ListingPrice;
            const listingPosition = Data.listingPosition;
            const weekLow = Data.weekLow;
            const NSECode = Data.NSECode;
            const closingDate = Data.closingDate;
            const listingDate = Data.listingDate;
            const weekHigh = Data.weekHigh;

            //MainLineIPO CompanyRegisterInfo
            const registerPhone = Data.registerPhone;
            const address = Data.address;
            const registerEmail = Data.registerEmail;
            const registerName = Data.registerName;
            const companyPhone = Data.companyPhone;
            const email = Data.email;
            const registerWebsite = Data.registerWebsite;
            const allotmentLink = Data.allotmentLink;
            const website = Data.website;
            //Status
            const IPOStatus = Data.IPOStatus;
            const CategoryForIPOS = Data.CategoryForIPOS;
            //Tentative Timetable
            const IPOOpenDate = Data.IPOOpenDate;
            const IPOCloseDate = Data.IPOCloseDate;
            const IPOAllotmentDate = Data.IPOAllotmentDate;
            const IPORefundsInitiation = Data.IPORefundsInitiation;
            const IPODematTransfer = Data.IPODematTransfer;
            const IPOListingDate = Data.IPOListingDate;
            const file = Data.file;
            usersArray.push(doc.data());
            const getFaq = faqs.select("faq").get();
            if (getFaq) {
              const Faqs = getFaq.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
            }
            const General = {
              disclaimer,
              IPOOpenDate,
              IPOCloseDate,
              IPOAllotmentDate,
              IPORefundsInitiation,
              IPODematTransfer,
              IPOListingDate,
              IPOStatus,
              preIssueShareHolding,
              reatailQuota,
              qibQuota,
              DRHPDraft,
              companyDescription,
              freshIssue,
              fromPrice,
              ObjectOfIssue,
              postIssueShareHolding,
              issueSize,
              RHPDraft,
              promotersName,
              faceValue,
              toPrice,
              issueType,
              companyName,
              nilQuota,
              listingAt,
              offerForSale,
              lotSize,
              earningPerShare,
              peersComparison,
              financialLotsize,
              returnonNetWorth,
              companyFinancials,
              netAssetValue,
              earningPERatio,
              sNII,
              others,
              total,
              subscriptionDetails,
              retailInvestors,
              qualifiedInstitutions,
              employees,
              bNII,
              nonInstitutionalBuyers,
              registerPhone,
              address,
              registerEmail,
              registerName,
              companyPhone,
              email,
              registerWebsite,
              allotmentLink,
              website,
              scriptPosition,
              closingDifferent,
              listingDifferent,
              BSEScript,
              closingPrice,
              ListingPrice,
              listingPosition,
              weekLow,
              NSECode,
              closingDate,
              listingDate,
              weekHigh,
              id,
              CategoryForIPOS,
              file,
            };
            // };
            res.status(200).send({
              msg: "Ipo Get Successfully ",
              Data: General,
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
  GetMainLineIpo,
  GetIdByMainLineIpo,
  GetMessage,
};
