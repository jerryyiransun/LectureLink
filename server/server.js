const axios = require("axios");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const corsOptions = {
//   origin: "https://leapconcis.com",
//   optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));

app.use(express.json());

app.get("/test", cors(), (req, res) => {
  res.status(200).json("got test");
});

app.get("/testcors", cors(corsOptions), (req, res) => {
  res.json("This is CORS-enabled for only leapconcis.com");
});

app.listen(8000, async () => {
  console.log(`Server is running on port 8000.`);
});