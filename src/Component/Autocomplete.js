import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Autocompletecharacters({
  characters,
  onChange,
  guesses,
  onKeyDown,
}) {
  const options = characters;

  const handleAutoCompleteChange = (event, value) => {
    onChange(event, value);
  };

  return (
    <div className="autocomplete-wrapper">
      <Autocomplete
        disablePortal
        autoFocus
        autoHighlight
        id="autocomplete-characters"
        options={options}
        onChange={handleAutoCompleteChange}
        getOptionDisabled={(option) => guesses.includes(option)}
        onKeyDown={onKeyDown}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a cosmere character"
          />
        )}
      />
    </div>
  );
}
