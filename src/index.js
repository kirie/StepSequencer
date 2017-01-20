import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachine from './components/drum_machine';

const App = () => {
  return (
    <DrumMachine />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));