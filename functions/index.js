import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAllUsers, getUserById, addUser } from "./src/users.js";
import { addKid, deleteKid, getKidById } from "./src/kids.js";
import {
  addCraftwork,
  deleteCraftwork,
  getCraftworkById,
} from "./src/craftworks.js";

//import jwt from "jsonwebtoken";
//import mySecretKey from "./secret.js";

const app = express();
app.use(cors());
app.use(express.json());

// setup my routes:
app.get("/users", getAllUsers);
app.get("/users/:userId", getUserById);
app.post("/users", addUser);
app.post("/kids", addKid);
app.get("/kids", getKidById);
app.delete("/kids", deleteKid);
app.get("/craftworks", getCraftworkById);
app.post("/craftworks", addCraftwork);
app.delete("/craftworks", deleteCraftwork);

export const api = functions.https.onRequest(app);
