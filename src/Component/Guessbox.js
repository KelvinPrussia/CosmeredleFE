export default function GuessBox({ guess, isLatestGuess, colourblindMode }) {
  const getResultClass = (value) => {
    switch (value) {
      case -1: // gave up
        return "guess-text"
      case 0:
        if (colourblindMode) {
          return "guess-wrong-cb"
        } else {
          return "guess-wrong";
        } 
      case 1:
        if (colourblindMode) {
          return "guess-partial-cb"
        } else {
          return "guess-partial";
        } 
      case 2:
        if (colourblindMode) {
          return "guess-right-cb"
        } else {
          return "guess-right";
        }
      default:
        return "";
    }
  };

  return (
    <div className={`guess-results ${isLatestGuess ? 'latest-guess-results' : ''}`}>
      <div className={`guess-box ${getResultClass(guess.name[1])}`}>
        <h3 className="guess-text">{guess.name[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.home_world[1])}`}>
        <h3 className="guess-text">{guess.home_world[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.first_appearance[1])}`}>
        <h3 className="guess-text">{guess.first_appearance[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.species[1])}`}>
        <h3 className="guess-text">{guess.species[0]}</h3>
      </div>
      <div className={`guess-box ${getResultClass(guess.abilities[1])}`}>
        <h3 className="guess-text">{guess.abilities[0]}</h3>
      </div>
    </div>
  );
}
