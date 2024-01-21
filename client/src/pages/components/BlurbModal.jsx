import React from "react";
import styles from "./BlurbModal.module.css";

export const BlurbModal = ({ name }) => {
  return (
    <div className={styles.modal}>
      <span className="text-[25px]">{name}</span>
    </div>
  );
};
