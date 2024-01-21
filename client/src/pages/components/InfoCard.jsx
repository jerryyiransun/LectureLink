import React from "react";
import styles from "./InfoCard.module.css";
import { BlurbModal } from "./BlurbModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const InfoCard = ({ name, pronouns, major, courses = [], imageUrl, openPopup }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.profileInfo}>
        <img src={imageUrl} alt="Profile" className={styles.profileImage} />
        <div className={styles.textIcon}>
          <div className={styles.blurbs}>
            <div className={styles.namePronouns}>
              {name && <h2>{name}</h2>}
              {pronouns && <h2>({pronouns})</h2>}
            </div>
            {major && <h2>{major}</h2>}
          </div>
          <FontAwesomeIcon icon={faArrowUp} className={styles.icon} onClick={openPopup}/>
        </div>
      </div>
      <div className={styles.courses}>
        {courses.map((course, index) => (
          <BlurbModal key={index} name={course} />
        ))}
      </div>
    </div>
  );
};
