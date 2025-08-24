import React from "react";
import closeIcon from "../Assets/close.png";

const ChangelogModal = ({onClose}) => {
  return (
    <>
          <div>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content changelog-modal">
              <img className="exit-btn" src={closeIcon} alt="Close pop-up" onClick={onClose}/>
              <h1 className="modal-title">What's new!</h1>
              <div className="modal-text changelog-text">
              <span className="changelog-date">21/06/2025</span>
                <hr/>
                <ul className="changelog-list">
                  <li className="changelog-heading">New Features:</li>
                    <li className="changelog-item">Added ability to share the results after giving up</li>
                    <li className="changelog-item">Added colourblind friendly share icons</li>
                    <li className="changelog-item">Added confirm popup for giving up</li>
                    <li className="changelog-item">Can now close the Give Up screen to see the correct attributes!</li>
                    <li className="changelog-item">Added button to show results popup after closing it (no need to refresh)</li>
                </ul>
                <span className="changelog-date">28/02/2025</span>
                <hr/>
                <ul className="changelog-list">
                  <li className="changelog-heading">Gameplay:</li>
                    <li className="changelog-item">Added multiple new characters, and updated some with new info from WaT</li>
                  <li className="changelog-heading">Fixes:</li>
                    <li className="changelog-item">Fixed info for multiple characters (Thanks to everyone who let's me know when there's a mistake!)</li>
                    <li className="changelog-item">Can no longer Give Up after closing the win screen</li>
                </ul>
                <span className="changelog-date">11/12/2024</span>
                <hr/>
                <ul className="changelog-list">
                  <li className="changelog-heading">New Features:</li>
                    <li className="changelog-item">Can now close the Game Won screen to see the correct attributes! (A lot of people asked for this, sorry for the delay...)</li>
                    <li className="changelog-item">Added a spoiler disclaimer for Wind and Truth</li>
                  <br/>
                  <li className="changelog-heading">Fixes:</li>
                    <li className="changelog-item">Fixed names for multiple characters</li>
                </ul>
                <span className="changelog-date">30/8/2024</span>
                <hr/>
                <ul className="changelog-list">
                  <li className="changelog-heading">New Features:</li>
                    <li className="changelog-item">Added a settings menu (cog wheel in top left).</li>
                    <li className="changelog-item">Added a colourblind mode (in the settings menu).</li>
                    <li className="changelog-item">Added a share option after completing a game</li>
                  <br/>
                  <li className="changelog-heading">Gameplay:</li>
                    <li className="changelog-item">Added multiple new (some highly requested) characters.</li>
                    <li className="changelog-item">Shardbearer now only applies to characters who have bound a dead blade<br/>e.g. Kaladin is no longer tagged as a Shardbearer, but Shallan still is.</li>
                  <br/>
                  <li className="changelog-heading">Fixes:</li>
                    <li className="changelog-item">Fixed making multiple guesses for the same character</li>
                </ul>
              </div>
            </div>
          </div>
    </>
  );
};

export default ChangelogModal;