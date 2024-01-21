import React from "react";
import styles from "./InfoCard.module.css";
import { BlurbModal } from "./BlurbModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card } from "react-bootstrap";

export const InfoCard = ({
  name,
  pronouns,
  major,
  courses = [],
  imageUrl,
  openPopup,
}) => {
  return (
    <Card style={{ width: "45%" }}>
      <FontAwesomeIcon
        icon={faArrowUp}
        className={styles.icon}
        onClick={openPopup}
      />
      <Card.Title className="d-flex flex-row justify-content-around align-items-center ">
        <img
          src={imageUrl}
          alt="profile picture"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        {
          <div className="d-flex flex-column">
            <h2>{`${name} (${pronouns})`}</h2>
            <h5>{`${major}`}</h5>
          </div>
        }
      </Card.Title>
      <Card.Body>
        <Card.Text>
          Hello My name is XXX and I am a XXX major. I am interested in XXX and
          XXX. I am looking for a study partner for XXX. I am available on
        </Card.Text>
      </Card.Body>

      <div className={styles.courses}>
        {courses.map((course, index) => (
          <Button key={index} disabled>
            {course}
          </Button>
        ))}
      </div>
    </Card>
  );
};
