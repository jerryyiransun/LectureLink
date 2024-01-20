import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./SearchPage.module.css";
import { InfoCard } from "./components/InfoCard";

export const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const list = ["APSC 101", "CPEN 221", "CPSC 210", "CPSC 221", "CPSC 213"];
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      setSuggestions(list.sort().filter((v) => regex.test(v)));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <h1 className={styles.title}>Search Page</h1>
      <div className={styles.searchContainer}>
        <Autocomplete
          disablePortal
          options={list}
          renderInput={(params) => (
            <TextField {...params} label="Search for a course..." />
          )}
        />
      </div>
      <div className={styles.cardContainer}>
        <InfoCard
          name="John Doe"
          pronouns="he/him"
          major="Software Engineering"
          courses={["Course 1", "Course 2", "Course 3"]}
          imageUrl="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
        />
      </div>
    </div>
  );
};
