const { connectDb } = require("./connectDb");

const collectionName = "kids";

exports.getKidById = (req, res) => {
  const { kidId } = req.params;
  if (!kidId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .doc(kidId)
    .get()
    .then((doc) => {
      let kid = doc.data();
      kid.id = doc.id;
      res.send(kid);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.addKid = (req, res) => {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .add(req.body)
    .then((doc) => {
      res.send("Kid created " + doc.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteKid = (req, res) => {
  const { kidId } = req.params;
  if (!kidId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();

  db.collection(collectionName)
    // db.collection("kids")
    .doc(kidId)
    .delete()
    .then((doc) => {
      let kid = doc.data();
      kid.id = doc.id;
      res.status(200).send("Kid deleted" + kid.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getKids = (req, res) => {
  // if (!kidId) {
  //   res.status(401).send("Invalid request");
  //   return;
  // }
  const db = connectDb();

  const { userId } = req.params;
  console.log(userId);
  const kids = [];
  db.collection(collectionName)
    .where("userId", "==", userId)
    .get()
    .then((collection) => {
      //console.log(doc.data());
      //let kids = doc.data();
      collection.docs.map((doc) => {
        const kid = {
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          dateOfBirth: doc.data().dateOfBirth,
          kidId: doc.id,
        };
        kids.push(kid);
      });
    })
    .then(() => res.status(200).send(kids));
};
