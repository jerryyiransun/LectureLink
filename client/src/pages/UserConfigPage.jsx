import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TextField from "@mui/material/TextField";
import defaultPfp from "../../assets/default-pfp.png";
import Select from "react-select";
import styles from "./UserConfigPage.module.css";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/config.js";

const fileTypes = ["JPG", "PNG", "GIF"];

export const UserConfigPage = () => {
  const { register, handleSubmit, setValue } = useForm({
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

  const [file, setFile] = useState(null);
  const list = [
    { label: "APSC 101", value: "APSC 101" },
    { label: "CPEN 221", value: "CPEN 221" },
    { label: "CPEN 211", value: "CPEN 211" },
    { label: "CPEN 213", value: "CPEN 213" },
    { label: "CPEN 211", value: "CPEN 214 " },
    { label: "CPEN 211", value: "CPEN 215 " },
    { label: "CPEN 211", value: "CPEN 216 " },
    { label: "CPEN 211", value: "CPEN 217 " },
  ];

  const handleFileDrop = (dropFile, event) => {
    const fileReader = new FileReader();

    // called when file reading is done
    fileReader.onload = function () {
      console.log("PFP Picture: " + fileReader.result);
      setFile(fileReader.result);
      setValue("profilePic", fileReader.result);
    };

    console.log(dropFile);
    fileReader.readAsDataURL(dropFile);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(auth);
    request_body = {
      uid: auth.currentUser.uid,
      name: data.name,
      email: auth.currentUser.email,
      pronouns: data.pronouns,
      facultyMajor: data.faculty,
      residenceStatus: data.residenceStatus,
      interests: data.interests,
      blurb: data.blurb,
      courses: data.courses,
      file: data.profilePic,
    } 
    
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column justify-content-center align-items-center gap-4  ">
        <h1>Profile</h1>
        <img
          src={file ? file : defaultPfp}
        />
        <FileUploader
          types={fileTypes}
          handleChange={handleFileDrop}
          {...register("profilePic")}
        />
        <div className={styles.gridContainer}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel controlId="name" label="Name">
                <Form.Control
                  type="text"
                  placeholder="Leave a comment here"
                  {...register("name")}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <FloatingLabel controlId="pronouns" label="Pronouns">
                <Form.Control
                  type="text"
                  placeholder="Leave a comment here"
                  {...register("pronouns")}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel controlId="faculty" label="Faculty/Major">
                <Form.Control
                  type="text"
                  placeholder="Leave a comment here"
                  {...register("faculty")}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <FloatingLabel
                controlId="residenceStatus"
                label="  Residence Status"
              >
                <Form.Control
                  type="text"
                  placeholder="Leave a comment here"
                  {...register("residenceStatus")}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="interests">
            <FloatingLabel
              controlId="interests"
              label="Interests"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                {...register("interests")}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="blurb">
            <FloatingLabel controlId="blurb" label="Blurb" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                rows={3}
                {...register("blurb")}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Select
              closeMenuOnSelect={false}
              styles={{ zIndex: 1000 }}
              isMulti
              options={list}
              className="mb-3"
              renderInput={(params) => (
                <TextField {...params} label=" Courses: " />
              )}
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
