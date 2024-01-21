import React from "react";
import styles from "./InfoCard.module.css";
import { BlurbModal } from "./BlurbModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";
import profilePic from "../../../assets/default-pfp.png";

export const InfoCard = ({
  name,
  pronouns,
  major,
  courses = [],
  imageUrl,
  openPopup,
}) => {
  return (
    <Card className={styles.card}>
      <FontAwesomeIcon
        icon={faArrowUp}
        className={styles.icon}
        onClick={openPopup}
      />
      <Card.Title className="d-flex flex-row justify-content-around align-items-center ">
        <img
          src={imageUrl ? imageUrl : profilePic}
          alt="profile picture"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        {
          <div className="d-flex flex-column">
            <h2>{`${name} (${pronouns})`}</h2>
            <h5>{`${major}`}</h5>
          </div>
        }
      </Card.Title>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div className={styles.courses}>
          {courses.map((course, index) => (
            <Button key={index} disabled>
              {course}
            </Button>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
