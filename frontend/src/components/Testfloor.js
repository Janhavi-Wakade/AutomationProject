import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Buttons from './Buttons';
import './Floor.css';

const Testfloor = () => {
  const [buttonStates, setButtonStates] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/buttons');
      setButtonStates(response.data); 
    } catch (error) {
      console.error('Error fetching button states:', error);
    }
  };

  const handleStateChange = async (idschema, newState) => {
    try {
      const response = await fetch(`http://localhost:5000/api/buttons`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update buttonStates after successful update
      const updatedButtonStates = buttonStates.map(button => {
        if (button.idschema === idschema) {
          return { ...button, state: newState };
        }
        return button;
      });

      setButtonStates(updatedButtonStates);

      console.log("Updated button state:", newState);
    } catch (error) {
      console.error('Error updating button state:', error);
    }
  };

  return (
    <div className='maindiv'>
      {buttonStates.map(button => (
        <div key={button.id} className={`floor ${button.state === 'ON' ? 'floor-on' : 'floor-off'}`}>
          <h2>{button.idschema}</h2>
          <Buttons
            buttonId={button.idschema} // Use idschema as buttonId
            initialButtonState={button.state}
            onStateChange={handleStateChange}
          />
        </div>
      ))}
    </div>
  );
};

export default Testfloor;
