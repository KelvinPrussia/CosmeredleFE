import React from "react";
import closeIcon from "../Assets/close.png";

const DisclaimerModal = ({onClose}) => {
  return (
    <>
          <div>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content disclaimer-modal">
              <img className="exit-btn" src={closeIcon} alt="Close pop-up" onClick={onClose}/>
              <h1 className="modal-title">Spoiler Disclaimer</h1>
              <div className="modal-text disclaimer-text">
                <p className="modal-text">
                    Cosmeredle has been updated with information from Wind and Truth
                    <br/>
                    Please be careful of spoilers!
                </p>
              </div>
            </div>
          </div>
    </>
  );
};

export default DisclaimerModal;