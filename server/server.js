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

/**
 * POST endpoint to create a new student record.
 *
 * Accepts JSON data with a student's UID and email, then creates a new document 
 * in the 'students' collection of the 'UBC' database. Additional student fields 
 * are initialized with default values.
 *
 * Route: POST /courses
 * 
 * Request Body:
 * - _id (String): Unique identifier for the student.
 * - email (String): Email address of the student.
 *
 * On success, adds a new student record to the database.
 * On error, logs the error without interrupting the server.
 *
 * Example Request Body:
 * {
 *   "_id": "12345",
 *   "email": "student@example.com"
 * }
 */
app.post("/courses", async (req, res) => {
  const input = req.body;
  try {
    const db = client.db("UBC");
    const collection = db.collection("students");

    await collection.insertOne({
      _id: input._id,
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
  } 

});

/**
 * POST endpoint to update student record.
 *
 * Accepts JSON data with a student's UID, email, profile picture etc.
 * Then creates a new document in the 'students' collection of the 'UBC' database. 
 *
 * Route: POST /config
 * 
 * Request Body:
 * - _id (String): Unique identifier for the student.
 * - email (String): Email address of the student.
 * - name (String): Name of student.
 * - pronouns (String): Pronouns of student.
 * - facultyMajor (String): Associated faculty/major of student.
 * - residenceStatus (String): Residence status of student.
 * - interests (String): Interests of student.
 * - blurb (String): Intriduction of student.
 * - courses (Array): Courses the student takes.
 * - profilePic (String): 64base String of students profile picture;
 * 
 * On success, updates the corresponding student's information on database.
 * On error, logs the error without interrupting the server.
 *
 * Example Request Body:
 * {
 *   "_id" : "21234567890",
 *   "courses" : "name@example.com",
 *   "name" : "John Doe",
 *   "pronouns" : "He/Him",
 *   "facultyMajor" : "ECE/computer engineering",
 *   "residenceStatus" : "Domestic",
 *   "interests" : "biking, hiking, coding",
 *   "blurb" : "Hi, I'm John Doe",
 *   "courses" : ["AMNE 356", "AMNE 261", "ANTH 461"],
 *   "profilePic" : ""
 *  } 
 */
app.post("/updateProfile", upload.single('profilePic'), async (req, res) => {
  const _id = req.body._id;
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
      { _id: _id },
      { $set: profile_data }
    );

    if (result.matchedCount === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send("User profile updated successfully");
    }
  } catch (error) {
    console.log(error);
  }
  
});

/**
 * GET endpoint to retrieve all courses.
 *
 * Retrives all courses in the Course Database.
 *
 * Route: GET /courses
 * 
 *
 * On success, returns all courses in Database.
 * On error, logs the error without interrupting the server.
 *
 */
app.get("/courses", cors(), async (req, res) => {
  const db = client.db("UBC");
  const collection = db.collection("courses");
  const courses = await collection.find({}).toArray();

  res.status(200).json(courses);
});

/**
 * GET endpoint to retrieve specific students profile data.
 *
 * Retrives corresponding uid's profile
 *
 * Route: GET /getinfo
 * 
 * Request Body:
 * - _id (String): Unique identifier for student.
 * 
 *
 * On success, returns student's profile.
 * On error, logs the error without interrupting the server.
 * 
 * Example Request Body:
 * {
 *   "_id" : "1234567890",
 *  } 
 */
app.get("/getinfo", async(req, res) => {
  try {
    const db = client.db("UBC");
    const collection = db.collection("students");
  
    const profile = await collection.find({_id : req.body._id}).toArray();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
  } 
});
