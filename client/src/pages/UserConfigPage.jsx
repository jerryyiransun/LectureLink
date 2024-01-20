import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export const UserConfigPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    faculty: '',
    courses: [],
  });
  const [file, setFile] = useState(null);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileDrop = (files, event) => {
    console.log(files);
    setFile(file);
  }

  return (
    <div>
      <h2>User Profile</h2>
      <form>
        <label>
          Name: {" "}
          <input type="text" name="name" value={userData.name} onChange={handleChangeInput} />
        </label>
        <br />
        <label>
          Gender: {" "}
          <input type="text" name="gender" value={userData.gender} onChange={handleChangeInput} />
        </label>
        <br />
        <label>
          Faculty: {" "}
          <input type="text" name="faculty" value={userData.faculty} onChange={handleChangeInput} />
        </label>
        <br />
        <label>
          Courses: {" "}
          <input type="text" name="courses" value={userData.courses} onChange={handleChangeInput} />
        </label>
      </form>
      <div>
        <h3>Upload Profile Picture</h3>
        <FileUploader
          types={fileTypes}
          handleChange={handleFileDrop}
        />
        <h3>User Details:</h3>
        <p>Name: {userData.name}</p>
        <p>Gender: {userData.gender}</p>
        <p>Faculty: {userData.faculty}</p>
        <p>Courses: {userData.courses}</p>
        <p>Profile Picture: {file}</p>
      </div>
    </div>
  );
};


