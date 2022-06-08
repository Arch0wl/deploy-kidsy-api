const { connectDb } = require("./connectDb");
const admin = require("firebase-admin");

const collectionName = "kids";

exports.addCraftwork = (req, res) => {
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
      let kidObj = doc.data();
      if (!kidObj.craftworks) kidObj.craftworks = [];
      const craftworkObj = {
        id: kidObj.craftworks.length,
        title: req.body.title,
        image: req.body.image,
        createdAt: admin.firestore.Timestamp.now(),
      };
      kidObj.craftworks.push(craftworkObj);
      db.collection(collectionName)
        .doc(kidId)
        .update(kidObj)
        .then(() => {
          res.send(kidObj);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });

  //
  //   .then((doc) => {
  //     res.send("Craftwork created " + doc.id);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   });
};

exports.deleteCraftwork = (req, res) => {
  const { craftworkId } = req.params;
  if (!craftworkId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection("craftworks")
    .doc(craftworkId)
    .delete()
    .then(() => {
      res.status(500).send(err);
    });
};
