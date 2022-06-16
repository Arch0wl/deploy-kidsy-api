const { connectDb } = require("./connectDb");

const collectionName = "users";

exports.getUserById = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .doc(userId)
    .get()
    .then((doc) => {
      let user = doc.data();
      user.id = doc.id;
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.addUser = (req, res) => {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .add({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then((doc) => {
      res.send("User created " + doc.id);
    })
    .catch((err) => {
      res.user(500).send(err);
    });
};
