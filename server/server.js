const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URL);

const app = express();

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// const corsOptions = {
//   //   origin: "https://leapconcis.com",
//   //   optionsSuccessStatus: 200,
// };

// app.options("*", cors(corsOptions));

// app.use(express.json());

// app.get("/test", cors(), (req, res) => {
//   res.status(200).json("got test");
// });

// app.get("/testdb", async (req, res) => {
//   const db = client.db("sample_mflix");
//   const collection = db.collection("movies");
//   const movies = await collection.find({}).toArray();

//   res.status(200).json(movies);
// });

// app.get("/testcors", cors(corsOptions), (req, res) => {
//   res.json("This is CORS-enabled for only leapconcis.com");
// });

// app.listen(3000, async () => {
//   console.log(`Server is running on port 8000.`);
//   client.connect();
// });
