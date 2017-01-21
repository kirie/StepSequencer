import React from 'react';
import ReactDOM from 'react-dom';
import DrumMachine from './components/drum_machine';
import '../assets/style/style.css';

const App = () => {
  return (
    <DrumMachine />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));