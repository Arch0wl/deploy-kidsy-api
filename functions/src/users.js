import connectDb from "../connectDb.js";

const collectionName = "users";

export function getAllUsers(req, res) {
  const db = connectDb();
  db.collection(collectionName)
    .get()
    .then((snapshot) => {
      const userArray = snapshot.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.send(userArray);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

export function getUserById(req, res) {
  const { userId } = req.params;
  if (!usertId) {
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
}

export function addUser(req, res) {
  if (!req.body) {
    res.status(401).send("Invalid request");
    return;
  }
  const db = connectDb();
  db.collection(collectionName)
    .add(req.body)
    .then((doc) => {
      res.send("User created " + doc.id);
    })
    .catch((err) => {
      res.user(500).send(err);
    });
}
