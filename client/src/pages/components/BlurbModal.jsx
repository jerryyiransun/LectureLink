import React from "react";
import styles from "./BlurbModal.module.css";

export const BlurbModal = (name) => {

    return (
        <div className={styles.modal}>
        <h1>{name}</h1>
        </div>
    );

}