import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';
import "./App.css";
import Autocompletecharacters from "./Component/Autocomplete";
import Guessbox from "./Component/Guessbox";
import GameResultModal from "./Component/GameResultModal";
import NewGameAlertModal from "./Component/NewGameAlertModal";
import RulesModal from "./Component/RulesModal";
import SettingsModal from "./Component/SettingsModal";
import GiveUpModal from "./Component/GiveUpModal";
import ChangelogModal from "./Component/ChangelogModal";
import DisclaimerModal from "./Component/DisclaimerModal";

function App() {
  const [characterList, setCharacterList] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(calcTimeRemaining());
  const [newGame, setNewGame] = useState(false);
  const [openEmailTooltip, setOpenEmailTooltip] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showGiveUpModal, setShowGiveUpModal] = useState(false);
  const [showChangelogModal, setChangelogModal] = useState(false);
  const [showGameResultModal, setGameResultModal] = useState(false);
  const [blockGuess, setBlockGuess] = useState(false);
  const [gameWon, setGameWon] = useState(() => {
    const storedWin = localStorage.getItem("gameWon");
    return storedWin ? JSON.parse(storedWin) : false;
  });
  const [guessCount, setGuessCount] = useState(() => {
    const storedGuessCount = localStorage.getItem("guessCount");
    return storedGuessCount ? JSON.parse(storedGuessCount) : 0;
  });
  const [guessList, setGuessList] = useState(() => {
    const storedGuesses = localStorage.getItem("guessList");
    return storedGuesses ? JSON.parse(storedGuesses) : [];
  });
  const [correctChar, setCorrectChar] = useState(() => {
    const storedCorrectChar = localStorage.getItem("correctChar");
    return storedCorrectChar ? storedCorrectChar : "";
  });
  const [playDate, setPlayDate] = useState(() => {
    const storedPlayDate = localStorage.getItem("playDate");
    return storedPlayDate ? storedPlayDate : "";
  });
  const [gaveUp, setGaveUp] = useState(() => {
    const storedGaveUp = localStorage.getItem("gaveUp");
    return storedGaveUp ? JSON.parse(storedGaveUp) : false;
  })
  const [colourblindMode, setColourblindMode] = useState(() => {
    const storedColourblindMode = localStorage.getItem("colourblindMode");
    return storedColourblindMode ? JSON.parse(storedColourblindMode) : false;
  })
  const [showDisclaimerModal, setDisclaimerModal] = useState(() => {
    const storedShowDisclaimer = localStorage.getItem("WaTSpoilerDisclaimer");
    return storedShowDisclaimer ? JSON.parse(storedShowDisclaimer) : true;
  });

  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const autocompleteChange = (event, value) => {
    setSelectedCharacter(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && selectedCharacter) {
      makeGuess();
    }
  }

  const addGuess = (newGuess) => {
    setGuessList((prevGuessList) => [...prevGuessList, newGuess]);
  };

  const updateGuessCount = () => {
    setGuessCount((prevGuessCount) => (prevGuessCount += 1));
  };

  const checkGameWon = (guess) => {
    if (Object.values(guess).every((value) => value[1] === 2)) {
      setCorrectChar(guess["name"][0]);
      setGameWon(true);
      setPlayDate(new Date().toISOString().split('T')[0]);
    }
  };

  const hours = String(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining / 1000 / 60) % 60)).padStart(2,"0");
  const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2,"0"); 

  function getCharacterList() {
    api("/list")
      .then((response) => {
        const res = response.data;
        setCharacterList({
          names: res.names,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.respoonse.headers);
        }
      });
  }

  function makeGuess() {
    setBlockGuess(true);
    
    api("/guess/" + selectedCharacter)
      .then((response) => {
        const newGuess = response.data;
        
        addGuess(newGuess);
        updateGuessCount();
        setSelectedCharacter(null);
        checkGameWon(newGuess);
        setBlockGuess(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getCorrectChar(hasGivenUp) {
    hasGivenUp = typeof hasGivenUp === "boolean" ? hasGivenUp : gaveUp;
    api("/correctchar")
      .then((response) => {
        const res = response.data;
        setCorrectChar(res.name);
        if (hasGivenUp) {
          const givenUpAnswer = normalizeGaveUp(res)
          addGuess(givenUpAnswer);
  }
        })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.respoonse.headers);
        }
      });
  }

  function normalizeGaveUp(responseData) {
    return {
      name: [responseData.name, -1],
      home_world: [responseData.home_world, -1],
      first_appearance: [responseData.first_appearance, -1],
      species: [responseData.species, -1],
      abilities: [responseData.abilities, -1],
    };
  }

  function calcTimeRemaining() {
    const now = new Date();
    const resetTime = new Date(now);

    resetTime.setUTCHours(0, 0, 0, 0);

    let timeDiff = resetTime - now;

    if (timeDiff <= 0) {
      resetTime.setDate(resetTime.getDate() + 1);
      timeDiff = resetTime - now;
    }
    return timeDiff;
  }

  function resetGame() {
    setGuessList([]); 
    setGuessCount(0); 
    setGameWon(false);
    setCorrectChar(""); 
    setPlayDate(new Date().toISOString().split('T')[0]); 
    setSelectedCharacter("");
    setGaveUp(false);
    setBlockGuess(false);
  }

  function clearLocalStorage() {
    localStorage.clear()
    window.location.reload();
  }

  function checkNewGame(hours, minutes, seconds) {
    if (hours === "00" && minutes === "00" && seconds === "00") {
      if (gameWon) {
        resetGame();
      } else {
        getCorrectChar();
        setNewGame(true);
      }
    }
  }

  function giveUp() {
    setGaveUp(true);

    setGameResultModal(true);
    getCorrectChar(true);
  }

  function toggleShowRulesModal() {
    setShowRulesModal(!showRulesModal);
  }

  function toggleShowSettingsModal() {
    setShowSettingsModal(!showSettingsModal);
  }

  function toggleShowGiveUpModal() {
    setShowGiveUpModal(!showGiveUpModal);
  }

  function toggleColourBlindMode() {
    setColourblindMode(!colourblindMode);
  }

  function toggleChangelogModal() {
    setChangelogModal(!showChangelogModal);
  }
  
  function toggleDisclaimerModal() {
    setDisclaimerModal(!showDisclaimerModal);
    localStorage.setItem("WaTSpoilerDisclaimer", JSON.stringify(false))
  }

  function hideGameResultModal() {
    setGameResultModal(false);
  }

  function copyEmail() {
    const copyText = "cosmeredle@gmail.com"
    navigator.clipboard.writeText(copyText);
    setOpenEmailTooltip(true);

    setTimeout(() => {
      setOpenEmailTooltip(false);
    }, 500);
  };

  function generateShareIcons(guessList) {
    let shareIcons = [];
    guessList.forEach(guess => {
      let shareLine = [];
      for (let value in guess) {
        switch (guess[value][1]) {
          case -1:
            shareLine.push("❌");
            break
          case 0:
            if (colourblindMode) {
              shareLine.push("⬜")
            } else {
              shareLine.push("🟥")
            } 
            break;
          case 1:
            if (colourblindMode) {
              shareLine.push("🟪");
            } else {
              shareLine.push("🟨");
            }
            break;
          case 2:
            if (colourblindMode) {
              shareLine.push("🟦")
            } else {
              shareLine.push("🟩")
            }
            break;
          default:
            return
        }
      }
      shareIcons.push(shareLine);
    })
    // console.log(shareIcons);
    return shareIcons;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calcTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getCharacterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //No dependency due to only running on initial render

  useEffect(() => {
    let currDate = new Date().toISOString().split('T')[0];
    if (playDate !== currDate) {
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //No dependency due to only running on initial render

  useEffect(() => {
    localStorage.setItem("guessList", JSON.stringify(guessList));
  }, [guessList]);

  useEffect(() => {
    localStorage.setItem("gameWon", JSON.stringify(gameWon));
    setGameResultModal((gameWon || gaveUp));
  }, [gameWon, gaveUp]);

  useEffect(() => {
    localStorage.setItem("guessCount", JSON.stringify(guessCount));
  }, [guessCount]);

  useEffect (() => {
    localStorage.setItem("correctChar", correctChar);
  }, [correctChar]);
  
  useEffect (() => {
    localStorage.setItem("playDate", playDate);
  }, [playDate]);

  useEffect (() => {
    localStorage.setItem("gaveUp", JSON.stringify(gaveUp));
  }, [gaveUp]);

  useEffect(() => {
    localStorage.setItem("colourblindMode", JSON.stringify(colourblindMode));
  }, [colourblindMode]);

  useEffect(() => {
    checkNewGame(hours, minutes, seconds);
    // eslint-disable-next-line 
  }, [seconds]) // Updates when seconds changes

  return (
    <div className="App">
      <img className="background-img" src="/images/CosmeredleBackground.png" alt="Cosmere constellation background"/>
      <header className="App-header">
        <h1 className="header-txt">Cosmeredle</h1>
      </header>
      {!(gaveUp || gameWon) && (
        <div className="search-container">
          <div className="searchbar">
            {characterList.names ? (
              <Autocompletecharacters
                className="autocomplete-search"
                onChange={autocompleteChange}
                characters={characterList.names.sort()}
                guesses={guessList.map((value) => value.name[0])}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p>Loading Characters...</p>
            )}
            <button
              className="guess-btn"
              disabled={!selectedCharacter || blockGuess || gameWon || gaveUp}
              onClick={makeGuess}
            >
              Guess
            </button>
          </div>
        </div>
      )}
        {guessCount >= 5 && gameWon === false && gaveUp === false && (<div>
          <button className="give-up-btn" onClick={toggleShowGiveUpModal}>
            Give up?
          </button>
        </div>)}
        {(gameWon === true || gaveUp === true) && (<div>
          <button className="show-results-btn" onClick={() => setGameResultModal(true)}>
            Show Results
          </button>
        </div>)}
      <div>
        <p className="game-timer">
          New round in {hours}:{minutes}:{seconds}
        </p>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <button onClick={resetGame}>resetGame</button>
      )}
      {process.env.NODE_ENV === 'development' && (
        <button onClick={clearLocalStorage}>clearLocalStorage</button>
      )}
      <div className="title-wrapper">
        <div className="guess-title">
          <h3 className="title-text">Name</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Home World</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">First Appearance</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Species</h3>
        </div>
        <div className="guess-title">
          <h3 className="title-text">Abilities/ Investiture</h3>
        </div>
      </div>
      <div className="guesses-wrapper">
        {guessList.length > 0 ? (
          guessList
            .slice()
            .reverse()
            .map((guess, index) => <Guessbox key={`${guess.name[0]}-${index}`} guess={guess} isLatestGuess={index === 0} colourblindMode={colourblindMode}/>)
        ) : (
          <div className="guess-results">
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
            <div className="guess-box">
              <h4 className="guess-text">?</h4>
            </div>
          </div>
        )}
      </div>
      <div>
        {showGameResultModal && (
          <GameResultModal
            character={correctChar}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            guessCount={guessCount}
            guessResults={generateShareIcons(guessList)}
            gameWon={gameWon}
            onClose={hideGameResultModal}
          />
        )}
      </div>
      <div>
        <NewGameAlertModal
          newGame={newGame && !gameWon}
          character={correctChar}
        />
      </div>
      <div className="left-menus">
        <Tooltip
          title={<span className="tooltip">Settings</span>}
          arrow
          disableInteractive/>
          <button className="menu-btn settings-btn" onClick={toggleShowSettingsModal}/>
        <Tooltip
          title={<span className="tooltip">How to play</span>}
          arrow
          disableInteractive/>
          <button className="menu-btn rules-btn" onClick={toggleShowRulesModal}/>
      </div>
      <div className="right-menus">
        <Tooltip
          title={<span className="tooltip">What's new?</span>}
          arrow
          disableInteractive>
          <button className="menu-btn changelog-btn" onClick={toggleChangelogModal}/>
        </Tooltip>
        <Tooltip
          title={<span className="tooltip">Kofi</span>}
          arrow
          disableInteractive>
          <div className="kofi-btn">
            <a className="kofi-link" href="https://ko-fi.com/kelvinprussia">
              <img className="kofi-img" src="/images/kofi_logo.png" alt="Kofi logo"/>
            </a>
          </div>
        </Tooltip>
      </div>
      <div>
        {showRulesModal && (<RulesModal onClose={toggleShowRulesModal} colourblindMode={colourblindMode}/>)}
      </div>
      <div>
        {showSettingsModal && (<SettingsModal onClose={toggleShowSettingsModal} colourblindMode={colourblindMode} toggleColourBlindMode={toggleColourBlindMode}/>)}
      </div>
      <div>
        {showGiveUpModal && (<GiveUpModal onClose={toggleShowGiveUpModal} giveUp={giveUp}/>)}
      </div>
      <div>
        {showChangelogModal && (<ChangelogModal onClose={toggleChangelogModal}/>)}
      </div>
      <div>
        {showDisclaimerModal && (<DisclaimerModal onClose={toggleDisclaimerModal}/>)}
      </div>
      <footer className="App-footer">
        <div className="footer-info footer-1">
          Contact: <Tooltip 
                      open={openEmailTooltip} 
                      title="Copied!" 
                      placement="top" 
                      arrow 
                      disableInteractive>
                        <button className="contact-link" onClick={copyEmail}>cosmeredle@gmail.com</button>
                    </Tooltip>
        </div>
        <div className="footer-info footer-2">
          All Cosmere characters belong to <a className="external-link" href="https://www.brandonsanderson.com/">Brandon Sanderson</a> / <a className="external-link" href="https://www.dragonsteelbooks.com/">Dragonsteel</a>
         </div>
         <div className="footer-info footer-3">
          Background by <a className="external-link" href="https://cosmere.es/">cosmere.es</a> & <a className="external-link" href="https://www.instagram.com/izykstewart/">Isaac Stewart</a>
         </div>
      </footer>
    </div>
  );
}

export default App;
