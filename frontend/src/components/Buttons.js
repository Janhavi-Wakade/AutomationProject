import React, { useState } from 'react';
import './Buttons.css';

const Buttons = ({ buttonId, initialButtonState, onStateChange }) => {
  const [buttonState, setButtonState] = useState(initialButtonState);
  var testVariable=false;
  const handleClick = async () => {
    testVariable=true;
    const newButtonState = buttonState === 'ON' ? 'OFF' : 'ON';
    setButtonState(newButtonState);
    onStateChange(buttonId, newButtonState);
  };

  return (
    <div>
      <button className={`switch-button ${buttonState}`} onClick={handleClick}>
        {testVariable?(initialButtonState==='ON'?'OFF':'ON'):initialButtonState}
      </button>
    </div>
  );
};

export default Buttons;
