import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import defaultPfp from "../../assets/default-pfp.png";

const fileTypes = ["JPG", "PNG", "GIF"];

export const UserConfigPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    pronouns: "",
    faculty: "",
    residenceStatus: "",
    interests: "",
    blurb: "",
    courses: [],
    profilePic: "",
  });
  const [file, setFile] = useState(null);
  const list = ["APSC 101", "CPEN 221", "CPSC 210", "CPSC 221", "CPSC 213"];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileDrop = (dropFile, event) => {
    const fileReader = new FileReader();

    // called when file reading is done
    fileReader.onload = function () {
      console.log(fileReader.result);
      setUserData((prevData) => ({
        ...prevData,
        profilePic: fileReader.result,
      }));
    };

    console.log(dropFile);
    fileReader.readAsDataURL(dropFile);
  };

  return (
    <div class="d-flex flex-column">
      <div class="config-page-profile"></div>
      <div class="config-page-inputs">
        <h2>User Profile</h2>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={userData.name}
          onChange={handleChangeInput}
        />
        <TextField
          id="outlined-basic"
          label="Pronouns"
          variant="outlined"
          value={userData.pronouns}
          onChange={handleChangeInput}
        />
        <TextField
          id="outlined-basic"
          label="Faculty/Major"
          variant="outlined"
          value={userData.faculty}
          onChange={handleChangeInput}
        />
        <TextField
          id="outlined-basic"
          label="Residence Status"
          variant="outlined"
          value={userData.residenceStatus}
          onChange={handleChangeInput}
        />
        <TextField
          id="outlined-basic"
          label="Interests"
          variant="outlined"
          value={userData.interests}
          onChange={handleChangeInput}
        />
        <TextField
          id="outlined-basic"
          label="Blurb"
          variant="outlined"
          value={userData.blurb}
          onChange={handleChangeInput}
        />
        <Autocomplete
          disablePortal
          options={list}
          renderInput={(params) => <TextField {...params} label="Courses: " />}
        />
        <h3>Upload Profile Picture</h3>
        <FileUploader types={fileTypes} handleChange={handleFileDrop} />
        <div>
          <h3 class="text-black">User Details:</h3>
          <p class="text-black">Name: {userData.name}</p>
          <p class="text-black">Gender: {userData.gender}</p>
          <p class="text-black">Faculty: {userData.faculty}</p>
          <p class="text-black">Courses: {userData.courses}</p>
          <img
            src={userData.profilePic ? userData.profilePic1 : defaultPfp}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};
