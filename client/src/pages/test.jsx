// ... (imports and other code)

export const SearchPage = () => {
    // ... (other state and functions)
  
    const fetchProfiles = async (search) => {
      try {
        const response = await axios.get("http://localhost:8000/profiles", {
          params: {
            _id: auth.currentUser.uid,
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
  
    const fetchData = async () => {
      // Wait for fetchCourses to complete before proceeding
      const allCourses = await fetchCourses();
      const uniqueCourses = [...new Set(allCourses)];
  
      // Use uniqueCourses as needed
    };
  
    // Call fetchData to initiate the fetching process
    fetchData();
  
    return (
      // ... (rest of your component)
    );
  };
  