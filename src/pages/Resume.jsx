import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Resume.css";
import Personal from "../components/Personal";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import axios from 'axios';

export default function Resume() {
  const url=import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); 
  const [personal, setPersonal] = useState({ fullName: '', lastName: '', email: '', phone: '', city: '', state: '' });
  const [projects, setProjects] = useState([{ name: '', techStack: '', date: '', description: [''], link: '' }]);
  const [experiences, setExperiences] = useState([{ company: '', role: '', startDate: '', endDate: '', description: [''], certificateLink: '', jobType: '', skills: '' }]);
  const [education, setEducation] = useState([{ college: "", city: "", degree: "", cgpa: "", startDate: "", endDate: "" }]);

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    const name = `${personal.fullName} ${personal.lastName}`;
    const userData = {
      name: name,
      email: personal.email,
      phone: personal.phone,
      city: personal.city,
      state: personal.state,
      education: education.map(item => ({
        college: item.college,
        city: item.city,
        degree: item.degree,
        cgpa: item.cgpa,
        startDate: item.startDate,
        endDate: item.endDate
      })),
      projects: projects.map(item => ({
        name: item.name,
        techStack: item.techStack,
        date: item.date,
        description: item.description,
        link: item.link
      })),
      internships: experiences.map(item => ({
        company: item.company,
        role: item.role,
        date: item.date,
        description: item.description,
        certificateLink: item.certificateLink,
        jobType: item.jobType,
        skills: item.skills
      }))
    };

    try {
      axios.post(`${url}/resume/store-data`, userData)
        .then(res => {
          console.log(res);
        })
    }
    catch (err) {
      console.log(err);
    }
    localStorage.setItem('email', personal.email);
    navigate('/resume1');
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const progressPercentage = (currentStep - 1) * 25;

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <Personal handleContinue={handleContinue} personal={personal} setPersonal={setPersonal} />;
      case 2:
        return <Education handleContinue={handleContinue} education={education} setEducation={setEducation} />;
      case 3:
        return <Projects handleContinue={handleContinue} projects={projects} setProjects={setProjects} />;
      case 4:
        return <Experience handleContinue={handleSubmit} experiences={experiences} setExperiences={setExperiences} />;
      default:
        return null;
    }
  };

  const handleDownloadSampleResume = () => {
    console.log("Download Sample Resume clicked");
  };

  return (
    <div className="resume">
      <div className="resume-container">
      <div className="resumebtn-div">
      <button className="sampleresume-btn" onClick={handleDownloadSampleResume}>
            Download Sample Resume
      </button>
      </div>
        <div className="top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            onClick={() => handleBack()}
            style={{ cursor: "pointer" }}
          >
            <mask
              id="mask0_1_333"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="40"
              height="40"
            >
              <rect width="40" height="40" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1_333)">
              <path
                d="M13.0417 21.6666L22.3751 31L20.0001 33.3333L6.66675 20L20.0001 6.66663L22.3751 8.99996L13.0417 18.3333H33.3334V21.6666H13.0417Z"
                fill="#1B1B1D"
              />
            </g>
          </svg>
          <div className="progress-bar-container">
            <div
              className="progress-bar-color"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <div
              className="progress-bar-remaining"
              style={{ width: `${80 - progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="res-component-container">
          <div className="res-content">{renderComponent()}</div>
        </div>
        
      </div>
    </div>
  );
}


