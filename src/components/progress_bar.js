import React, { PropTypes } from 'react';

const progressBar = (props) => {
  const temp = Array(16).fill(1);
  const temp2 = temp.map((v, i) => {
    if (i === props.prog) {
      return (<div
        className="progresslighton"
        key={`${v}prog${i}`}
      />);
    }
    return (<div className="progresslight" key={`${v}prog${i}`} />);
  });
  return (
    <div className="progressbar">{temp2}</div>
  );
};

progressBar.propTypes = {
  prog: PropTypes.number.isRequired
};


export default progressBar;
