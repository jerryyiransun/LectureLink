import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./SearchPage.module.css";
import { InfoCard } from "./components/InfoCard";
import { Popup } from "./components/Popup";

export const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  console.log(search);

  const handlePopupOpen = (data) => {
    setPopupOpen(true);
    setPopupInfo(data);
  };

  const handleInputChange = (event, value) => {
    const newValue = value;
    setSearch(newValue);
    if (newValue.length > 0) {
      const regex = new RegExp(`^${newValue}`, "i");
      setSuggestions(list.sort().filter((v) => regex.test(v)));
    } else {
      setSuggestions([]);
    }
  };

  const data = [
    {
      name: "John Doe",
      pronouns: "he/him",
      major: "Software Engineering",
      courses: ["CPEN 221", "CPEN 211", "MATH 220"],
      imageUrl:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      interests: ["Coding", "Hiking", "Music"],
      introParagraph: "Hello, I'm John Doe and I love coding...",
      residenceStatus: "Commuter",
    },
    {
      name: "Jane Doe",
      pronouns: "she/her",
      major: "Computer Science",
      courses: ["CPSC 110", "CPSC 121", "CPSC 210"],
      imageUrl:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      interests: ["Reading", "Gaming", "Cooking"],
      introParagraph: "Hi, I'm Jane Doe and I enjoy reading...",
      residenceStatus: "On Residence",
    },
    {
      name: "Bob Smith",
      pronouns: "he/him",
      major: "Information Systems",
      courses: ["COMM 335", "COMM 437", "CPSC 210"],
      imageUrl:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      interests: ["Sports", "Photography", "Traveling"],
      introParagraph: "Hey, I'm Bob Smith and I love sports...",
      residenceStatus: "Commuter",
    },
    {
      name: "Alice Johnson",
      pronouns: "she/her",
      major: "Data Science",
      courses: ["STAT 300", "CPSC 340", "CPSC 210"],
      imageUrl:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      interests: ["Data Analysis", "Hiking", "Painting"],
      introParagraph:
        "Hello, I'm Alice Johnson and I'm passionate about data analysis...",
      residenceStatus: "On Residence",
    },
    {
      name: "Charlie Brown",
      pronouns: "they/them",
      major: "Cybersecurity",
      courses: ["CPSC 418", "CPSC 416", "CPSC 317"],
      imageUrl:
        "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
      interests: ["Cybersecurity", "Gaming", "Music"],
      introParagraph:
        "Hi, I'm Charlie Brown and I'm interested in cybersecurity...",
      residenceStatus: "Commuter",
    },
  ];

  // Extract all courses from the data
  const allCourses = data.flatMap((item) => item.courses);

  // Remove duplicates
  const uniqueCourses = [...new Set(allCourses)];

  return (
    <>
      {popupOpen && (
        <Popup data={popupInfo} closePopup={() => setPopupOpen(false)} />
      )}
      <div className={styles.outerContainer}>
        <h1 className={styles.title}>Search Page</h1>
        <div className={styles.cardSearch}>
          <div className={styles.searchContainer}>
            <Autocomplete
              disablePortal
              options={uniqueCourses}
              renderInput={(params) => (
                <TextField {...params} label="Search for a course..." />
              )}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.cardContainer}>
            {data
              .filter((item) => item.courses.includes(search))
              .map((item, index) => (
                <InfoCard
                  key={index}
                  name={item.name}
                  pronouns={item.pronouns}
                  major={item.major}
                  courses={item.courses}
                  imageUrl={item.imageUrl}
                  openPopup={() => handlePopupOpen(item)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
