import React, { useState } from "react";
import "./Edu.css";
import EducationModal from "./EducationModal";

const Education1 = ({ education, resumeId }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const addEducation = () => {
    setSelectedEducation(null);
    setShowModal(true);
  };

  const editEducation = (educationItem) => {
    setSelectedEducation(educationItem);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEducation(null);
  };

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="ipad-pro">
      <div className="frame-parent">
        <div className="education-details-wrapper">
          <h3 className="education-details">Education Details</h3>
        </div>
        <button className="add-new-parent" onClick={addEducation}>
          <div className="add-new">Add new</div>
          <div className="fi-br-add-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_1_188)">
    <path d="M8 0C6.41775 0 4.87104 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87897 15.1541 3.84547 13.6543 2.34568C12.1545 0.845886 10.121 0.00229405 8 0V0ZM8 14C6.81332 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19975 1.88378 7.99335 2.11529 6.82946C2.3468 5.66557 2.91825 4.59647 3.75736 3.75736C4.59648 2.91824 5.66558 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45672C11.3925 2.91085 12.3295 3.67988 12.9888 4.66658C13.6481 5.65327 14 6.81331 14 8C13.9982 9.59076 13.3655 11.1159 12.2407 12.2407C11.1159 13.3655 9.59076 13.9982 8 14ZM11.3333 8C11.3333 8.26522 11.228 8.51957 11.0404 8.70711C10.8529 8.89464 10.5986 9 10.3333 9H9V10.3333C9 10.5986 8.89465 10.8529 8.70711 11.0404C8.51957 11.228 8.26522 11.3333 8 11.3333C7.73479 11.3333 7.48043 11.228 7.2929 11.0404C7.10536 10.8529 7 10.5986 7 10.3333V9H5.66667C5.40145 9 5.1471 8.89464 4.95956 8.70711C4.77203 8.51957 4.66667 8.26522 4.66667 8C4.66667 7.73478 4.77203 7.48043 4.95956 7.29289C5.1471 7.10536 5.40145 7 5.66667 7H7V5.66667C7 5.40145 7.10536 5.1471 7.2929 4.95956C7.48043 4.77202 7.73479 4.66667 8 4.66667C8.26522 4.66667 8.51957 4.77202 8.70711 4.95956C8.89465 5.1471 9 5.40145 9 5.66667V7H10.3333C10.5986 7 10.8529 7.10536 11.0404 7.29289C11.228 7.48043 11.3333 7.73478 11.3333 8Z" fill="#992E9D"/>
  </g>
  <defs>
    <clipPath id="clip0_1_188">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>
          </div>
        </button>
      </div>
      <div className="ipad-pro-child" />
      {/* Render all education boxes */}
      {education.map((edu, index) => (
        <section key={index} className="frame-group">
          <div className="meenakshi-college-of-engineeri-parent">
            <div className="meenakshi-college-of">{edu.college}</div>
            <div className="be-computer-science-enginee-parent">
              <div className="be-computer-science">
                {edu.degree} | {edu.cgpa} CGPA
              </div>
              <div className="div">
                {edu.startDate}-{edu.endDate}
              </div>
            </div>
          </div>
          <div
            className="edit-parent"
            onClick={() => editEducation(edu)}
          >
            <div className="edit">Edit</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
            >
              {/* Edit icon */}
            </svg>
          </div>
        </section>
      ))}
      {/* Modal for adding/editing education */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <EducationModal
              resumeId={resumeId}
              education={selectedEducation}
              add={!selectedEducation} // If no selectedEducation, it's an addition
              onClose={handleModalSubmit} // Close modal on submit
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Education1;
