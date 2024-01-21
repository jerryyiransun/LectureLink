import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import style from "./Popup.module.css";

export const Popup = ({ data, closePopup }) => {
  if (!data) {
    return null;
  }

  return (
    <div className={style.overlay}>
      <div className={style.popup}>
        <div className={style.buttonName}>
          <h2>
            {data.name} ({data.pronouns})
          </h2>
          <Button variant="outline-secondary" onClick={closePopup}>
            Close
          </Button>
        </div>
        <p>
          <strong>Major:</strong> {data.major}
        </p>
        <p>
          <strong>Courses:</strong> {data.courses.join(", ")}
        </p>
        <img src={data.imageUrl} alt={data.name} className={style.image} />
        <p>
          <strong>Interests:</strong> {data.interests.join(", ")}
        </p>
        <p>
          <strong>Residence Status:</strong> {data.residenceStatus}
        </p>
        <p>{data.introParagraph}</p>
      </div>
    </div>
  );
};
