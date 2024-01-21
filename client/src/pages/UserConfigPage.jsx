import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import defaultPfp from "../../assets/default-pfp.png";
import Select from "react-select";
import styles from "./UserConfigPage.module.css";

import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { auth } from "../../firebase/config.js";
import { fetchCourses, updateProfile } from "../api/userApi.js";
import { useQuery } from "react-query";

const fileTypes = ["JPG", "PNG", "GIF"];

export const UserConfigPage = () => {
  const { register, handleSubmit, control, setValue } = useForm({
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

  const { data: courses, isLoading: isCoursesLoading } = useQuery(
    "courses",
    fetchCourses
  );

  const cleanedData = courses?.map((item) => {
    return {
      label: item.code,
      value: item.code,
    };
  });

  const handleFileDrop = (dropFile) => {
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

  const onSubmit = async (data) => {
    console.log(data);
    console.log(auth);

    const request_body = {
      _id: auth.currentUser.uid,
      name: data.name,
      email: auth.currentUser.email,
      pronouns: data.pronouns,
      facultyMajor: data.faculty,
      residenceStatus: data.residenceStatus,
      interests: data.interests,
      blurb: data.blurb,
      courses: data.courses,
      profilePic: data.profilePic,
    };
    try {
      const response = await updateProfile(request_body);

      if (response?.ok) {
        console.log("Profile updated successfully");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="d-flex flex-column justify-content-center align-items-center gap-4  ">
        <h1>Profile</h1>
        <img src={file ? file : defaultPfp} className={styles.image} />
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
            <Controller
              control={control}
              name="courses"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  isLoading={isCoursesLoading}
                  value={value}
                  name={name}
                  ref={ref}
                  closeMenuOnSelect={false}
                  isMulti
                  options={cleanedData}
                  className="mb-3"
                  placeholder="Select Courses..."
                />
              )}
            />
          </Form.Group>
        </div>

        <Button variant="primary px-4 " type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};
