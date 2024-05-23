import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resume1.css";
import Info from "../components/Info";
import Projects1 from "../components/Projects1";
import Experience1 from "../components/Experience1";
import Education1 from "../components/Education1";

function Resume1() {
  const url=import.meta.env.VITE_URL;
  const [activeComponent, setActiveComponent] = useState("Education");
  
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(import.meta.env.VITE_URL);
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const res = await axios.post(`${url}/resume/get-data`, {
        'email':localStorage.getItem('email')
      });
      console.log(localStorage.getItem('email'));
      setUserData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  
  function renderComponents() {
    if (!userData || Object.keys(userData).length === 0) {
      return <div>Loading...</div>;
    }
  
    switch (activeComponent) {
      case "Education":
        return (userData.education && userData.education.length > 0) ? (
          <Education1
            education={userData.education}
            resumeId={userData._id}
          />
        ) : (
          <div>No education data available</div>
        );
  
      case "Projects":
        return (userData.projects && userData.projects.length > 0) ? (
          <Projects1
            projects={userData.projects}
            resumeId={userData._id}
          />
        ) : (
          <div>No projects data available</div>
        );
  
      case "Experience":
        return (userData.internships && userData.internships.length > 0) ? (
          <Experience1
            experiences={userData.internships}
            resumeId={userData._id}
          />
        ) : (
          <div>No experience data available</div>
        );
  
      default:
        return null;
    }
  }
  

  return (
      <div className="resume1-container">
        <Info
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          userData={userData}
        />
        {renderComponents()}
      </div>
    
  );
  
}

export default Resume1;
