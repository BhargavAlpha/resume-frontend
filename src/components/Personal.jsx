import React, { useState, useEffect } from 'react';
import './Component.css';

function Personal({ handleContinue, personal, setPersonal }) {
  // Define state variables for personal information
  const [fullName, setFullName] = useState(personal.fullName || '');
  const [lastName, setLastName] = useState(personal.lastName || '');
  const [phone, setPhone] = useState(personal.phone || '');
  const [email, setEmail] = useState(personal.email || '');
  const [city, setCity] = useState(personal.city || '');
  const [state, setState] = useState(personal.state || '');

  // State to manage if all fields are filled
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all fields are filled
  useEffect(() => {
    if (fullName && lastName && phone && email && city && state) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fullName, lastName, phone, email, city, state]);

  // Handle continue button click
  const handleContinueClick = () => {
    // Update the personal state with the entered information
    setPersonal({ ...personal, fullName, lastName, phone, email, city, state });
    // Call the handleContinue function passed from the parent component
    handleContinue();
  };

  return (
    <div className='component'>
      <h2>Personal information</h2>
      <div className='row1'>
        <div className='input-div' >
          <label>Full Name</label>
          <input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder='e.g., John'
            className='input-box'
          />
        </div>
      </div>
      <div className='row1'>
        <div className='input-div'>
          <label>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='e.g., Doe'
            className='input-box'
          />
        </div>
      </div>
      <div className='row1'>
        <div className='input-div' >
          <label>Phone</label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='e.g., 123-456-7890'
            className='input-box'
          />
        </div>
      </div>
      <div className='row1'>
        <div className='input-div'>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='e.g., john@example.com'
            className='input-box'
          />
        </div>
      </div>
      <div className='row1'>
        <div className='input-div' >
          <label>City</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='e.g., New York'
            className='input-box'
          />
        </div>
      </div>
      <div className='row1'>
        <div className='input-div' >
          <label>State</label>
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='e.g., NY'
            className='input-box'
          />
        </div>
      </div>
      <button 
        className='continue-btn' 
        onClick={handleContinueClick} 
        disabled={!isFormValid}
      >
        Continue
      </button>
    </div>
  );
}

export default Personal;
