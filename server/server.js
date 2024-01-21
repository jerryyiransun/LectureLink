const axios = require("axios");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URL);

const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

const corsOptions = {
  //   origin: "https://leapconcis.com",
  //   optionsSuccessStatus: 200,
};

app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/test", cors(), (req, res) => {
  res.status(200).json("got test");
});

app.listen(8000, async () => {
  console.log(`Server is running on port 8000.`);
  client.connect();
});

// Tested
app.post("/courses", async (req, res) => {
  const input = req.body;
  try {
    const db = client.db("UBC");
    const collection = db.collection("students");

    await collection.insertOne({
      uid: input.uid,
      email: input.email,
  
      name: "",
      pronouns: "",
      facultyMajor: "",
      residenceStatus: "",
      interests: "",
      blurb: "",
      courses: [],
    });
  } catch(err) {
    console.log(err);
  } finally {
    await client.close();
  }

});

// Not tested
app.post("/config", upload.single('profilePic'), async (req, res) => {
  const uid = req.body.uid;
  let profilePicBase64;

  if(req.file) {
    profilePicBase64 = req.file.buffer.toString('base64');
  }

  const profile_data = {
    name: req.body.name,
    pronouns: req.body.pronouns,
    facultyMajor: req.body.facultyMajor,
    residenceStatus: req.body.residenceStatus,
    interests: req.body.interests,
    blurb: req.body.blurb,
    courses: req.body.courses,
    profilePic: profilePicBase64
  };

  try {
    const db = client.db("UBC");
    const collection = db.collection("students");
    const result = await collection.updateOne(
      { uid: uid },
      { $set: profile_data }
    );

    if (result.matchedCount === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send("User profile updated successfully");
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
  
});

// Tested
app.get("/courses", cors(), async (req, res) => {
  const db = client.db("UBC");
  const collection = db.collection("courses");
  const courses = await collection.find({}).toArray();

  res.status(200).json(courses);
});