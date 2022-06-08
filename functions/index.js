const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { getUserById, addUser } = require("./src/users.js");
const { addKid, deleteKid, getKidById } = require("./src/kids");
const { addCraftwork, deleteCraftwork } = require("./src/craftworks.js");

//import jwt from "jsonwebtoken";
//import mySecretKey from "./secret.js";

const app = express();
app.use(cors());
app.use(express.json());

// setup my routes:

// TODO: should generate user info + all kids
// app.get("/users/:userId/kids", getUserKids);

// ALL END POINTS BELOW WORKS
app.get("/users/:userId", getUserById);
app.get("/kids/:kidId", getKidById);
app.post("/craftworks/:kidId", addCraftwork);
app.post("/users", addUser);
app.post("/kids", addKid);
app.delete("/kids/:kidId", deleteKid);

//TODO: implement the same way as deleteCraftwork see craftworks
app.delete("/craftworks/:craftworkId", deleteCraftwork);

exports.app = functions.https.onRequest(app);
