import React from "react";

const GiveUpConfirmationModal = ({ onClose, giveUp }) => {
  const handleConfirm = () => {
    giveUp(true);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content give-up-modal">
        <img
          className="exit-btn"
          src="images/close.png"
          alt="Close pop-up"
          onClick={onClose}
        />
        <h1 className="modal-title">Confirm Give Up</h1>
        <p className="modal-text">
          Are you sure you want to give up on today's Cosmeredle?
        </p>
        <button className="give-up-btn" onClick={handleConfirm}>
          Yes, Give Up
        </button>
      </div>
    </>
  );
};

export default GiveUpConfirmationModal;
