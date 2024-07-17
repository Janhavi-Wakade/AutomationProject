import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Buttons from './Buttons';
import './Floor.css';

const Floor = () => {
  const [buttonState4, setbuttonState4] = useState();
  const [buttonState5, setbuttonState5] = useState();
  const [buttonState6, setbuttonState6] = useState();

  useEffect(() => {
    fetchButtonState('1b', setbuttonState4);
    fetchButtonState('2b', setbuttonState5);
    fetchButtonState('3b', setbuttonState6);
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
    console.log("updated button state : ", newState);
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
        case '1b':
          setbuttonState4(newState);
          break;
        case '2b':
          setbuttonState5(newState);
          break;
        case '3b':
          setbuttonState6(newState);
          break;
        default:
          break;
      }
    } 
    
    catch (error) {
      console.error('Error updating button state:', "aaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  };
  

  return (
    <div className='maindiv'>
      <div className={`floor ${buttonState4 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>First Floor</h2>
        <Buttons buttonId="1b" initialButtonState={buttonState4} onStateChange={handleStateChange} />
      </div>
      <div className={`floor ${buttonState5 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>Second Floor</h2>
        <Buttons buttonId="2b" initialButtonState={buttonState5} onStateChange={handleStateChange} />
      </div>
      <div className={`floor ${buttonState6 == 'ON' ? 'floor-on' : 'floor-off'}`}>
        <h2>Third Floor</h2>
        <Buttons buttonId="3b" initialButtonState={buttonState6} onStateChange={handleStateChange} />
      </div>
    </div>
  );
};

export default Floor;