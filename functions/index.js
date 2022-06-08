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
//TODO: check in postman
app.get("/users/:userId", getUserById);

// TODO: should generate user info + all kids
// app.get("/users/:userId/kids", getUserKids);

// ALL END POINTS BELOW WORKS
app.get("/kids/:kidId", getKidById);
app.post("/craftworks/:kidId", addCraftwork);
app.post("/users", addUser);
app.post("/kids", addKid);

//TODO: check in postnam
app.delete("/kids/:kidId", deleteKid);

//TODO: implement the same way as addCraftwork see craftworks
app.delete("/craftworks/:craftworkId", deleteCraftwork);

exports.app = functions.https.onRequest(app);
