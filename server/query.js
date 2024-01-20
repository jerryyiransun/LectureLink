const axios = require("axios");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
// MongoDB setup
const uri =
  "mongodb+srv://sunyiran0817:zbPcX2B5Gvlo3hIy@lecturelinkcluster.x71ivwo.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API URL
const apiUrl = "https://ubcexplorer.io/getAllCourses";
const sfuAPIBaseUrl = "http://www.sfu.ca/bin/wcm/course-outlines";

async function fetchCourses() {
  try {
    await client.connect();
    const database = client.db("SFU");
    const collection = database.collection("courses");
    const year = 2024;
    const yearResponse = await axios.get(`${sfuAPIBaseUrl}?${year}`);
    const terms = yearResponse.data;

    for (let term of terms) {
      const departmentsResponse = await axios.get(
        `${sfuAPIBaseUrl}?${year}/${term}`
      );
      const departments = departmentsResponse.data;

      for (let department of departments) {
        const coursesResponse = await axios.get(
          `${sfuAPIBaseUrl}?${year}/${term}/${department}`
        );
        const courses = coursesResponse.data;

        for (let course of courses) {
          const courseId = uuidv4();

          const transformedCourse = {
            _id: courseId,
            dept: department,
            code: course.code,
            name: course.name,
            term: `${year}${term}`,
          };

          console.log(transformedCourse);
        }
      }
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await client.close();
  }
}

fetchCourses();
// async function fetchCourses() {
//   try {
//     // Fetch data from the API
//     const response = await axios.get(apiUrl);
//     const courses = response.data;

//     // Transform data
//     const transformedCourses = courses.map((course) => ({
//       _id: course._id,
//       dept: course.dept,
//       code: course.code,
//       name: course.name,
//       term: "2024W2", // Constant value as per your requirement
//     }));

//     // Insert data into MongoDB
//     await client.connect();
//     const database = client.db("UBC"); // Replace with your DB name
//     const collection = database.collection("courses"); // Replace with your collection name

//     // If you want to clear the existing data and insert fresh, uncomment the next line
//     await collection.deleteMany({});

//     const insertResult = await collection.insertMany(transformedCourses);
//     console.log("Inserted documents:", transformedCourses);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await client.close();
//   }
// }
