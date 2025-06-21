import { Tooltip } from "@mui/material";
import React, { useState } from "react";

export default function GameResultModal({ character, hours, minutes, seconds, guessCount, guessResults, gameWon, onClose }) {
  const [openShareTooltip, setOpenShareTooltip] = useState(false);


  function copyShareText() {
    let copyText = gameWon
      ? `I got today's Cosmeredle in ${guessCount} tries!\n`
      : `I gave up on today's Cosmeredle after ${guessCount} tries...\n`;
    
    // Convert each line (array) to a string, then join them with newlines
    copyText += guessResults.map(line => line.join("")).join("\n") + "\n";
        
    copyText += gameWon
    ? "Try and beat me at https://cosmeredle.net/"
    : "See if you can at https://cosmeredle.net/";
  

    navigator.clipboard.writeText(copyText);
    setOpenShareTooltip(true);

    setTimeout(() => {
      setOpenShareTooltip(false);
    }, 500);
  }

  return (
    <>
      <div className="modal-delay">
        <div className="modal-overlay" onClick={onClose} />
        <div className="modal-content game-result-modal">
          <img className="exit-btn" src="images/close.png" alt="Close pop-up" onClick={onClose} />
          <h1 className="modal-title">{gameWon ? "Congratulations!" : "Better luck next time!"}</h1>
          <p className="modal-text">
            The correct character was <a className="external-link" href={`https://coppermind.net/wiki/${character}`}>{character}</a>.<br />
            {gameWon ? (
              guessCount === 1 ? (
                <span>You guessed it right on the first try!</span>
              ) : (
                <span>You got it in {guessCount} tries.</span>
              )
            ) : (
              <span>Please try again tomorrow.</span>
            )}<br/>
            {guessResults.map((line, index) => (
              <React.Fragment key={index}><span>{line}</span><br/></React.Fragment>
            ))}
            <Tooltip 
              open={openShareTooltip} 
              title={<span className="tooltip">Copied to clipboard!</span>} 
              placement="bottom" 
              arrow 
              disableInteractive>
              <button className="share-results-btn" onClick={copyShareText}>Click here to share!</button>
            </Tooltip>
          </p>
          <p className="modal-timer">
            New round in {hours}:{minutes}:{seconds}
          </p>
        </div>
      </div>
    </>
  );
}
