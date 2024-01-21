import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./SearchPage.module.css";
import { InfoCard } from "./components/InfoCard";
import { Popup } from "./components/Popup";
import { auth } from "../../firebase/config.js";
import axios from "axios";

export const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

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

  const fetchProfiles = async (search) => {
    try {
      const response = await axios.get("http://localhost:8000/profiles", {
        params: {
          _id: auth?.currentUser?.uid,
          courses: search,
        },
      });

      console.log("Profiles:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return []; // Return an empty array or handle the error accordingly
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/courses");
      console.log("Courses:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return []; // Return an empty array or handle the error accordingly
    }
  };

  useEffect(() => {
    const returnData = fetchCourses();
    setAllCourses(returnData);
  }, []);

  // Extract all courses from the data
  // const allCourses = fetchCourses();

  // Remove duplicates
  // const uniqueCourses = [...new Set(allCourses)];

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
              options={allCourses}
              renderInput={(params) => (
                <TextField {...params} label="Search for a course..." />
              )}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.cardContainer}>
            {/* {data
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
              ))} */}
              {fetchProfiles(search).map((item, index) => (
                <InfoCard
                  key={index}
                  name={item.name}
                  pronouns={item.pronouns}
                  major={item.major}
                  courses={item.courses}
                  imageUrl={item.imageUrl}
                  openPopup={() => handlePopupOpen(item)}
                />
              )
              )}
          </div>
        </div>
      </div>
    </>
  );
};
