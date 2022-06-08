const admin = require("firebase-admin");
const myCredentials = require("./credentials.json");

exports.connectDb = () => {
  if (!admin.apps.length) {
    // are we already connected?
    admin.initializeApp({
      // if not, connect
      credential: admin.credential.cert(myCredentials),
    });
    //} // now we have access to the database
  }
  return admin.firestore();
};
