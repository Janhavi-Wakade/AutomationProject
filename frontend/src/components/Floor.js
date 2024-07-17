import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Buttons from './Buttons';
// import './Floor.css';

const Floor = () => {
  const [buttonState1, setButtonState1] = useState(null);
  const [buttonState2, setButtonState2] = useState(null);
  const [buttonState3, setButtonState3] = useState(null);

  useEffect(() => {
    fetchButtonState('1a', setButtonState1);
    fetchButtonState('2a', setButtonState2);
    fetchButtonState('3a', setButtonState3);
  }, []);

  const fetchButtonState = async (buttonId, setButtonState) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/button/${buttonId}`);
      console.log(buttonId," ",response.data.state," ",response.data._id);
      setButtonState(response.data.state);
    } catch (error) {
      console.error('Error fetching button state:', error);
    }
  };
  const handleStateChange = async (buttonId, newState) => {
    console.log(buttonId);
    try {
      const response = await fetch(`http://localhost:5000/api/buttons/${buttonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({state: newState}),
      });
      console.log("here");
  
      if (!response.ok) {
        throw new Error(`error Status: ${response.status}`);
      }
  
      switch (buttonId) {
        case '1a':
          setButtonState1(newState);
          break;
        case '2a':
          setButtonState2(newState);
          break;
        case '3a':
          setButtonState3(newState);
          break;
        default:
          break;
      }
  
      console.log("updated button state : ", newState);
    } 
    
    catch (error) {
      console.error('Error updating button state:', "aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  };
  

  return (
    <div className='maindiv'>
      <div className={`floor ${buttonState1 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>First Floor</h2>
        <Buttons buttonId="1a" initialButtonState={buttonState1} onStateChange={handleStateChange} />
      </div>
      <div className={`floor ${buttonState2 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>Second Floor</h2>
        <Buttons buttonId="2a" initialButtonState={buttonState2} onStateChange={handleStateChange} />
      </div>
      <div className={`floor ${buttonState3 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>Third Floor</h2>
        <Buttons buttonId="3a" initialButtonState={buttonState3} onStateChange={handleStateChange} />
      </div>
    </div>
  );
};

export default Floor;