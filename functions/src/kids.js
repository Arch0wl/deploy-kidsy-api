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
  db.collection("kids")
    .doc(kidId)
    .delete()
    .then(() => {
      res.send("Kid deleted.");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
