
// AlertPopup.js

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import '../style/alertPopup.css';
import alert from "../resources/alert.png"

const AlertPopup = ({ alertData, onClose }) => {
  const { _source, _index } = alertData;
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="popup">
      <div className="popup-content">
      <Button variant="outline-secondary" onClick={onClose}  >
          Close
        </Button>
        <div className='Row1'>
        <h2>{_index} Detected!</h2>
        <div>
          {/* Display an image here */}
          <img src={alert} alt="Alert Image" style={{ maxWidth: '50%' }} />
        </div>

        </div>
       
        <Button variant="outline-info" onClick={toggleContentVisibility} className="toggle-button">
          View Details
        </Button>
        {isContentVisible && (
          <div>
            {Object.entries(_source).slice(0, 9).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPopup;
