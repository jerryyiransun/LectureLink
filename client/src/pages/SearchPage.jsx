import { useState } from "react";
import styles from "./SearchPage.module.css";
import { InfoCard } from "./components/InfoCard";
import { Popup } from "./components/Popup";
import Select from "react-select";
import { useQuery } from "react-query";
import { fetchCourses, fetchProfiles } from "../api/userApi.js";
import { Spinner } from "react-bootstrap";

export const SearchPage = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handlePopupOpen = (data) => {
    setPopupOpen(true);
    setPopupInfo(data);
  };

  const { data: courses, isLoading: isCoursesLoading } = useQuery(
    "courses",
    fetchCourses
  );

  const { data: profiles, isLoading } = useQuery(
    ["profiles", selectedCourse],
    async () => {
      const data = await fetchProfiles(selectedCourse);
      console.log("Profile Data:", data);
      return data;
    },
    {
      enabled: selectedCourse !== null,
    }
  );

  const cleanedData = courses?.map((item) => {
    return {
      label: item.code,
      value: item.code,
    };
  });

  return (
    <>
      {popupOpen && (
        <Popup data={popupInfo} closePopup={() => setPopupOpen(false)} />
      )}
      <div className={styles.outerContainer}>
        <h1 className={styles.title}>Search Page</h1>
        <div className={styles.cardSearch}>
          <div className={styles.searchContainer}>
            <Select
              placeholder="Search for a course..."
              isLoading={isCoursesLoading}
              options={cleanedData}
              onChange={(e) => {
                setSelectedCourse(e?.value);
              }}
            />
          </div>
          <div className={styles.cardContainer}>
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                {profiles?.map((item, index) => (
                  <InfoCard
                    key={index}
                    name={item.name}
                    pronouns={item.pronouns}
                    major={item.facultyMajor}
                    courses={item.courses}
                    imageUrl={item.imageUrl}
                    openPopup={() => handlePopupOpen(item)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
