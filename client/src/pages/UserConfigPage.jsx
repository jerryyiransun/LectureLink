import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import defaultPfp from "../../assets/default-pfp.png";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const fileTypes = ["JPG", "PNG", "GIF"];

export const UserConfigPage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      pronouns: "",
      faculty: "",
      residenceStatus: "",
      interests: "",
      blurb: "",
      courses: [],
      profilePic: "",
    },
  });

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row>
          <Col>
            <div className="config-page-profile">
              <h3>User Details:</h3>
              <p>Name: {userData.name}</p>
              <p>Gender: {userData.gender}</p>
              <p>Faculty: {userData.faculty}</p>
              <p>Courses: {userData.courses}</p>
              <img
                src={userData.profilePic ? userData.profilePic1 : defaultPfp}
                className="rounded-circle"
                style={{ height: "100px", width: "100px" }}
                alt="Profile"
              />
            </div>
          </Col>
          <Col>
            <Row>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  {...register("name")}
                />
              </Col>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Pronouns"
                  variant="outlined"
                  {...register("pronouns")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Faculty/Major"
                  variant="outlined"
                  {...register("faculty")}
                />
              </Col>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Residence Status"
                  variant="outlined"
                  {...register("residenceStatus")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Interests"
                  variant="outlined"
                  {...register("interests")}
                />
              </Col>
              <Col>
                <TextField
                  id="outlined-basic"
                  label="Blurb"
                  variant="outlined"
                  {...register("blurb")}
                />
              </Col>
            </Row>
            <Row>
              <Autocomplete
                disablePortal
                options={list}
                renderInput={(params) => (
                  <TextField {...params} label="Courses: " />
                )}
              />
            </Row>
            <Row>
              <h3>Upload Profile Picture</h3>
              <FileUploader
                types={fileTypes}
                handleChange={handleFileDrop}
                {...register("profilePfp")}
              />
            </Row>
            <Button type="submit">Submit Form</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
