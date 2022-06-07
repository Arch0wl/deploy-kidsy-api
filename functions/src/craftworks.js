import connectDb from "./connectDb.js";

const collectionName = "craftworks";

export function addCraftwork(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .add(req.body)
    .then((doc) => {
      res.send("Craftwork created " + doc.id);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getCraftworkById(req, res) {
  const { craftworkId } = req.params;
  if (!craftworkId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .doc(craftworkId)
    .get()
    .then((doc) => {
      let kid = doc.data();
      kid.id = doc.id;
      res.send(kid);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function deleteCraftwork(req, res) {
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
}
