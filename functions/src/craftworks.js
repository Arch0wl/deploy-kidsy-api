const { connectDb } = require("./connectDb");
const admin = require("firebase-admin");

const collectionName = "kids";
const craftworkName = "kids/craftworks";

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
  const { kidId } = req.params;
  const emptyCraftwork = {};

  if (!kidId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  // const craftworks = db.doc('kids/craftworks')
  // db.collection(collectionName)
  // .doc(craftworkId)
  db.collection("kids").doc("craftworks").get();
  emptyCraftwork
    .data()

    .delete()
    .then((doc) => {
      // doc.update({
      //   craftworks: FieldValue.delete(),
      // });
      let kidObj = doc.data();
      if (!kidObj.craftworks) kidObj.craftworks = [];
      const craftworkObj = {
        id: kidObj.craftworks.length,
        title: req.body.title,
        image: req.body.image,
        deleteAt: admin.firestore.Timestamp.now(),
      };
      kidObj.craftworks.delete(craftworkObj).catch((err) => {
        res.status(500).send(err);
      });
    });
};

// exports.deleteCraftwork = (req, res) => {
//   const { craftworkId } = req.params;
//   if (!craftworkId) {
//     res.status(401).send("Invalid request");
//     return;
//   }
//   const db = connectDb();
//   db.collection("kids")
//     .doc(craftworkId)
//     .delete()
//     .then(() => {
//       res.send("Kid deleted.");
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// };
