import axios from "axios";

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
