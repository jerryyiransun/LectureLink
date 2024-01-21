import axios from "axios";
import { auth } from "../../firebase/config.js";

export const updateProfile = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/updateProfile", {
      data,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const registerAccount = async ({ _id, email }) => {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      _id: _id,
      email: email,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCourses = async () => {
  try {
    const response = await axios.get("http://localhost:8000/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

export const fetchProfiles = async (search) => {
  try {
    const response = await axios.get("http://localhost:8000/profiles", {
      params: {
        _id: auth?.currentUser?.uid,
        course: search,
      },
    });

    console.log("Profiles:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return []; // Return an empty array or handle the error accordingly
  }
};
