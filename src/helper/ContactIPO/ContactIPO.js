const { firestore } = require("../../config/firestoreCloud");
const Contact = firestore.collection("Contact Us");

/**
 * The following Api contains source code for a  Contact Us IPO.
 */
const createContact = async (req, res, body) => {
  try {
    const email = req.body.email;
    const emailCheck = await Contact.where("email", "==", email).get();
    const getEmail = emailCheck.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (!getEmail.length > 0) {
      const ContactIPO = req.body;
      const createdAt = { createdAt: new Date() };
      const contact = Object.assign(ContactIPO, createdAt);
      if (ContactIPO) {
        const id = await Contact.add(contact);
        const ids = { id: id.id };

        const merged = Object.assign(ContactIPO, ids, createdAt);
        res.status(200).send({
          msg: "Contact Created Successfully",
          data: merged,
        });
      } else {
        res.status(300).send({ msg: "Contact Not Created" });
      }
    } else {
      res.status(300).send({ msg: "!Email Already Exists" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(400).send(error);
  }
};

module.exports = {
  createContact,
};
