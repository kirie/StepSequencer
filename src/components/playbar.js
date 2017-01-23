import React, { PropTypes } from 'react';
import Toggle from './toggle';

const playBar = (props) => {
  return (
    <div className="drumrackbar">
      <div className="drumracklabel">SEQUENCE</div>
      <Toggle abfunc={props.toggle_f} />
      <div className="bpmplaybar">
        <input type="number" className="tempolabel" onChange={props.tempo_f} value={props.bpm_num} />
        <div className="playstopbutton" onClick={props.playbutton_f}>
          <i className="fa fa-play fa-2x" aria-hidden="true" />
          <div className="slash">/</div>
          <i className="fa fa-stop fa-2x" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

playBar.propTypes = {
  bpm_num: PropTypes.number.isRequired,
  toggle_f: PropTypes.func.isRequired,
  tempo_f: PropTypes.func.isRequired,
  playbutton_f: PropTypes.func.isRequired
};

export default playBar;
