import React from "react";

const RulesModal = ({onClose, colourblindMode}) => {
  return (
    <>
          <div>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal-content rules-modal">
              <img className="exit-btn" src="images/close.png" alt="Close pop-up" onClick={onClose}/>
              <h1 className="modal-title">How to play</h1>
              <div className="modal-text rules-text">
                <span>Try to guess a different Cosmere character every day by using the hints given.</span>
                <br/>
                  {colourblindMode ? <span><span className="incorrect-text-cb">Grey</span> = Guess is incorrect</span> : <span><span className="incorrect-text">Red</span> = Guess is incorrect</span>}
                <br/>
                  {colourblindMode ? <span><span className="partial-text-cb">Magenta</span> = Guess is partially correct (only applies to species and abilities/investiture) e.g.</span> : <span><span className="partial-text">Orange</span> = Guess is partially correct (only applies to species and abilities/investiture)</span>}
                <div className="example-container">
                  {colourblindMode ? <img className="example-img" src="/images/species-partial-cb.png" alt="Species example"/> : <img className="example-img" src="/images/species-partial.png" alt="Species example"/>}
                  <span>Character is Human but not Skaa</span>
                </div>
                <div className="example-container">
                  {colourblindMode ? <img className="example-img" src="/images/abilities-partial-cb.png" alt="Abilities example"/> : <img className="example-img" src="/images/abilities-partial.png" alt="Abilities example"/>}
                  <span>At least one of the abilities/investitures is correct</span>
                </div>
                <br/>
                {colourblindMode ? <span><span className="correct-text-cb">Cyan</span> = Guess is correct</span> : <span><span className="correct-text">Green</span> = Guess is correct</span>}
                <br/>
                <span>All information is taken from <a className="external-link" href="https://coppermind.net">Coppermind</a></span>
                <br/>
                <span>Inspired by <a className="external-link" href="https://loldle.net/">LoLdle</a> and <a className="external-link" href="https://smidle.net/">Smidle</a></span>
                </div>
            </div>
          </div>
    </>
  );
};

export default RulesModal;
