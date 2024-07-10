import React from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = React.useState('red');
  const nextColor = buttonColor === 'red' ? 'blue' : 'red';

  return (
    <div>
      <button className={buttonColor} onClick={() => setButtonColor(nextColor)}>
        Change to {nextColor}
      </button>
      <br />
      <input type="checkbox" id="disabled-button-checkbox" defaultChecked={false} />
      <label htmlFor="disabled-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
