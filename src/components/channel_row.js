import React from 'react';

const channelRow = (props) => {
  function makeRow(v, i) {
    const channelClasses = v ? 'lighton' : 'lightoff';
    return (
      <div
        className="stepbutton"
        data-channel={props.channelNum}
        data-stepindx={props.bside ? i+16 : i}
        onClick={props.updateSeq}
        key={`c${v}s${i}`}
      ><div className={channelClasses} /></div>
    );
  }

  return (
    <div className="sequencerrow">
      {props.channel.map(makeRow, this)}
    </div>
  );
};

export default channelRow;
