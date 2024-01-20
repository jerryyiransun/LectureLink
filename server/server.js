const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URL);

const app = express();

const corsOptions = {
  //   origin: "https://leapconcis.com",
  //   optionsSuccessStatus: 200,
};

app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/test", cors(), (req, res) => {
  res.status(200).json("got test");
});

app.get("/testdb", async (req, res) => {
  const db = client.db("sample_mflix");
  const collection = db.collection("movies");
  const movies = await collection.find({}).toArray();

  res.status(200).json(movies);
});

app.listen(8000, async () => {
  console.log(`Server is running on port 8000.`);
  client.connect();
});

app.get("/courses", cors(), async (req, res) => {
  const db = client.db("UBC");
  const collection = db.collection("courses");
  const courses = await collection.find({}).toArray();

  res.status(200).json(courses);
});
