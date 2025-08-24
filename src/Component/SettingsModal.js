import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material";
import closeIcon from "../Assets/close.png";

const SettingsModal = ({onClose, colourblindMode, toggleColourBlindMode}) => {
  const ColourblindSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      '&.Mui-checked': {
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#e3d9ba',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#E1C362',
    },
  }));

  const ColourblindLabel = styled(FormControlLabel)(({ theme }) => ({
    '.MuiFormControlLabel-label': {
      fontSize: 'calc(12px + 1vmin);'
    }
  }));

  return (
    <>
        <div>
          <div className="modal-overlay" onClick={onClose} />
          <div className="modal-content settings-modal">
            <img className="exit-btn" src={closeIcon} alt="Close pop-up" onClick={onClose}/>
            <h1 className="modal-title">Settings</h1>
            <div className="modal-text settings-text">
                <ColourblindLabel
                    control={<ColourblindSwitch/>}
                    label="Colourblind mode"
                    labelPlacement="start"
                    checked={colourblindMode}
                    onChange={toggleColourBlindMode}
                />
            </div>
            <br/>
          </div>
        </div>
    </>
  );
}

export default SettingsModal;
