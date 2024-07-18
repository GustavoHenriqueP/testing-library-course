import React from 'react';
import './App.css';
import { kebabCaseToTitleCase } from './helpers';

function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState('medium-violet-red');
  const nextColorClass =
    buttonColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const nextColorTitle = kebabCaseToTitleCase(nextColorClass);

  return (
    <div>
      <button
        className={disabled ? 'gray' : buttonColor}
        onClick={() => setButtonColor(nextColorClass)}
        disabled={disabled}
      >
        Change to {nextColorTitle}
      </button>
      <br />
      <input
        type="checkbox"
        id="disabled-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
