import React from 'react';
import './Component.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns'; // Importing format and parse functions from date-fns

function Experience({ handleContinue, experiences, setExperiences }) {
  const handleStartDateChange = (index, date) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].startDate = date ? format(date, 'MM/yyyy') : ''; // Formatting date to MM/yyyy
    setExperiences(updatedExperiences);
  };

  const handleEndDateChange = (index, date) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].endDate = date ? format(date, 'MM/yyyy') : ''; 
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { company: '', role: '', jobType: '', skills: '', startDate: '', endDate: '', description: [''], certificateLink: '' },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index][name] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddDescriptionPoint = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].description.push('');
    setExperiences(updatedExperiences);
  };

  const handleRemoveDescriptionPoint = (index, subIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index].description.splice(subIndex, 1);
    setExperiences(updatedExperiences);
  };

  const isContinueDisabled = experiences.some((experience) =>
    Object.values(experience).some((val) => typeof val === 'string' && val.trim() === '')
  );

  return (
    <div className='component'>
      <h2>Experience Details</h2>
      {experiences.map((experience, index) => (
        <div key={index} className='itr'>
          <div className='row1'>
            <div className='input-div' id='exp-company'>
              <label>Company</label>
              <input
                type='text'
                name='company'
                value={experience.company}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='e.g., ABC Tech'
                className='input-box'
              />
            </div>
            <div className='input-div' id='exp-role'>
              <label>Role</label>
              <input
                type='text'
                name='role'
                value={experience.role}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='Role'
                className='input-box'
              />
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='exp-jobType'>
              <label>Job Type</label>
              <input
                type='text'
                name='jobType'
                value={experience.jobType}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='e.g., Full Time, Internship, Part Time'
                className='input-box'
              />
            </div>
            <div className='input-div' id='exp-skills'>
              <label>Skills</label>
              <input
                type='text'
                name='skills'
                value={experience.skills}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='e.g., React, Node.js'
                className='input-box'
              />
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='exp-startDate'>
              <label>Start Date</label>
              <DatePicker
                selected={experience.startDate ? parse(experience.startDate, 'MM/yyyy', new Date()) : null}
                onChange={(date) => handleStartDateChange(index, date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="MM/YYYY"
                className='input-box'
                id='date-picker'
              />
            </div>
            <div className='input-div' id='exp-endDate'>
              <label>End Date</label>
              <DatePicker
                selected={experience.endDate ? parse(experience.endDate, 'MM/yyyy', new Date()) : null}
                onChange={(date) => handleEndDateChange(index, date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="MM/YYYY"
                className='input-box'
                id='date-picker'
              />
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='exp-description'>
              <label>Description</label>
              {experience.description.map((desc, subIndex) => (
                <div key={subIndex} className='itr'>
                  <div className='points-container'>
                    <input
                      type='text'
                      value={desc}
                      onChange={(e) => {
                        const updatedExperiences = [...experiences];
                        updatedExperiences[index].description[subIndex] = e.target.value;
                        setExperiences(updatedExperiences);
                      }}
                      placeholder={`Point ${subIndex + 1}`}
                      className='input-box'
                      id='point-input'
                    />
                    {subIndex > 0 && (
                      <span className="remove-point-icon" onClick={() => handleRemoveDescriptionPoint(index, subIndex)}>❌</span>
                    )}
                  </div>
                </div>
              ))}
              <button className='add-desc-btn' onClick={() => handleAddDescriptionPoint(index)}>Add Description Point</button>
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='exp-certificate'>
              <label>Certificate Link</label>
              <input
                type='text'
                name='certificateLink'
                value={experience.certificateLink}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='Certificate Link'
                className='input-box'
              />
            </div>
          </div>
          {index > 0 && (
            <button className='remove-project-btn' onClick={() => handleRemoveExperience(index)}>Remove Experience</button>
          )}
        </div>
      ))}
      <div className='btn-container'>
        <button className='add-project-btn' onClick={handleAddExperience}>Add Experience</button>
        <button className='continue-btn' onClick={handleContinue} >Continue</button>
      </div>
    </div>
  );
}

export default Experience;
