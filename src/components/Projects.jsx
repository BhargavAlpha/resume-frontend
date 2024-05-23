import React from 'react';
import './Component.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

function Projects({ handleContinue, projects, setProjects }) {
  
  const handleAddProject = () => {
    setProjects([...projects, { name: '', techStack: '', date: null, description: [''], link: '' }]);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
  };

  const handleAddDescriptionPoint = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].description.push('');
    setProjects(updatedProjects);
  };

  const handleRemoveDescriptionPoint = (index, subIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[index].description.splice(subIndex, 1);
    setProjects(updatedProjects);
  };

  const handleDateChange = (index, date) => {
    const updatedProjects = [...projects];
    updatedProjects[index].date = date;
    setProjects(updatedProjects);
  };

  return (
    <div className='component'>
      <h2>Project Details</h2>
      {projects.map((project, index) => (
        <div key={index} className='itr'>
          <div className='row1'>
            <div className='input-div' id='proj-title'>
              <label>Project Title</label>
              <input
                type='text'
                name='name'
                value={project.name}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='e.g., Online Gaming App'
                className='input-box'
              />
            </div>
            <div className='input-div' id='proj-techstack'>
              <label>Tech Stack Used</label>
              <input
                type='text'
                name='techStack'
                value={project.techStack}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='e.g., React, Node.js'
                className='input-box'
              />
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='date'>
              <label>Date</label>
              <DatePicker
                selected={project.date ? parse(project.date, 'MM/yyyy', new Date()) : null}
                onChange={(date) => handleDateChange(index, date ? format(date, 'MM/yyyy') : '')}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="MM/YYYY"
                className='input-box'
                id='date-picker'
              />
            </div>
          </div>
          <div className='row1'>
            <div className='input-div' id='proj-desc'>
              <label>Project Description</label>
              {project.description.map((desc, subIndex) => (
                <div key={subIndex} className='itr'>
                    <div className='points-container'>
                    <input
                      type='text'
                      value={desc}
                      onChange={(e) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index].description[subIndex] = e.target.value;
                        setProjects(updatedProjects);
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
            <div className='input-div' id='proj-links'>
              <label>Project Links</label>
              <input
                type='text'
                name='link'
                value={project.link}
                onChange={(e) => handleInputChange(index, e)}
                placeholder='https://github.com/example'
                className='input-box'
              />
            </div>
          </div>
          {index > 0 && (
            <button className='remove-proj-btn' onClick={() => handleRemoveProject(index)}>Remove Project</button>
          )}
        </div>
      ))}
      <div className='btn-container'>
        <button className='add-project-btn' onClick={handleAddProject}>Add Project</button>
        <button className='continue-btn'  onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default Projects;
