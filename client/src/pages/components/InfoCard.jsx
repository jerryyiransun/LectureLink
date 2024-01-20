import React from "react";
import styles from "./InfoCard.module.css";

export const InfoCard = ({
  name,
  pronouns,
  major,
  courses,
  imageUrl,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.profileCourses}>
        <div className={styles.profileInfo}>
        <img src={imageUrl} alt="Profile" className={styles.profileImage} />
        <span className={styles.namePronouns}>
          {name} ({pronouns})
        </span>
        <span className={styles.facultyMajor}>
         {major}
        </span>
      </div>
      <div className={styles.courses}>
        {courses.map((course, index) => (
          <span key={index} className={styles.course}>
            {course}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};
