import React, { Component } from 'react';
import Tone from 'tone';
import PositionTransform from '../../assets/js/position';
import { demoTrack } from '../../assets/js/patterns';
import { nullTrack } from '../../assets/js/null_track';
import ChannelRow from './channel_row';
import ProgressBar from './progress_bar';
import ScrewPlate from './screws';
import Toggle from './toggle';

class drumMachine extends Component {
  constructor(props) {
    super(props);
    this.abswitch = this.abswitch.bind(this);
    this.updatePattern = this.updatePattern.bind(this);
    this.startStop = this.startStop.bind(this);
    this.changeTempo = this.changeTempo.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.clearPattern = this.clearPattern.bind(this);
    this.positionMarker = this.positionMarker.bind(this);

    this.state = {
      bpm: 94,
      position: 0,
      volume: 0,
      playing: false,
      bside: false,
      currentPattern: demoTrack
    };

    this.sampleOrder = ['BD', 'SD', 'CL', 'CA', 'LT', 'CH', 'OH', 'HT'];

    const getColumns = (track) => {
      const result = [];
      for (let i = 0; i < 32; i += 1) {
        result.push(track.map((v, idx) => { return v[i] ? this.sampleOrder[idx] : null }).filter(v => v));
      }
      return result;
    };
    this.columnPattern = getColumns(this.state.currentPattern);

    const multSampler = new Tone.MultiPlayer({
      urls: {
        BD: '../../assets/samples/Kick.wav',
        SD: '../../assets/samples/Snare.wav',
        CL: '../../assets/samples/Clap.wav',
        CA: '../../assets/samples/Clave.wav',
        LT: '../../assets/samples/LowTom.wav',
        CH: '../../assets/samples/ClosedHat.wav',
        OH: '../../assets/samples/OpenHat.wav',
        HT: '../../assets/samples/HighTom.wav'
      }
    }).toMaster();

    const steps = Array(32).fill(1).map((v, i) => { return i; });

    this.playSeq2 = new Tone.Sequence((time, value) => {
      this.columnPattern[value].forEach((v) => { return multSampler.start(v, time, 0, '16n', 0);});
    }, steps, '16n');

    this.playSeq2.start();
    this.playSeq2.loop = true;

    // Loop over 2 measures
    Tone.Transport.setLoopPoints(0, '2m');
    Tone.Transport.loop = true;

    // Update position every 16th note
    Tone.Transport.scheduleRepeat(this.positionMarker, '16n');

    // BPM and volume reflect state
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Master.volume.value = this.state.volume;
  }

  clearPattern() {
    this.setState({ currentPattern: nullTrack });
  }

  positionMarker() {
    this.setState({ position: PositionTransform[Tone.Transport.position.slice(0, 5)] });
  }

  startStop() {
    if (this.state.playing) {
      Tone.Transport.stop();
      this.setState({ playing: false });
    }
    else {
      Tone.Transport.start('+0.25');
      this.setState({ playing: true });
    }
  }

  changeTempo(e) {
    let newTempo = parseInt(e.currentTarget.value, 10);
    if (isNaN(newTempo)) {
      newTempo = 10;
    }
    if (newTempo > 200) {
      newTempo = 200;
    }
    Tone.Transport.bpm.value = newTempo;
    this.setState({ bpm: newTempo });
  }

  updatePattern(event) {
    const channelNum = parseInt(event.currentTarget.dataset.channel, 10);
    const stepNum = parseInt(event.currentTarget.dataset.stepindx, 10);
    const temp2 = this.state.currentPattern;
    if (temp2[channelNum][stepNum]) {
      temp2[channelNum][stepNum] = null;
      let temp3 = this.columnPattern[stepNum].slice();
      let target = temp3.indexOf(this.sampleOrder[channelNum]);
      temp3.splice(target, 1);
      this.columnPattern[stepNum] = temp3;
      this.setState({ currentPattern: temp2 });
    }
    else {
      let newSamp = this.sampleOrder[channelNum];
      this.columnPattern[stepNum].push(newSamp);
      temp2[channelNum][stepNum] = true;
      this.setState({ currentPattern: temp2 });
    }
    this.setState({ currentPattern: temp2 });
  }

  abswitch() {
    this.setState({ bside: !this.state.bside });
  }

  changeVolume(e, value) {
    this.setState({ volume: value });
    if (value < -39) {
      value = -10000;
    }
    Tone.Master.volume.value = value;
  }

  render() {
    function makeSeqRow(v, i) {
      let pattern;
      if (this.state.bside) {
        pattern = v.slice(16);
      }
      else {
        pattern = v.slice(0, 16);
      }
      return (
        <ChannelRow
          bside={this.state.bside}
          key={`${i}row`}
          channelNum={i}
          updateSeq={this.updatePattern}
          channel={pattern}
        />
      );
    }

    return (
      <div className="container">
        <div className="rackcabinet">
          <div className="rack">
            <div className="drumrack">
              <ScrewPlate />
              <ProgressBar prog={this.state.position} />
              {this.state.currentPattern.map(makeSeqRow, this)}
              <div className="drumrackbar">
                <div className="drumracklabel">SEQUENCE</div>
                <Toggle 
                  abfunc = {this.abswitch} />
                <div className="bpmplaybar">
                  <input type="number" className="tempolabel" onChange={this.changeTempo} value={this.state.bpm} />
                  <div className="playstopbutton" onClick={this.startStop}><i className="fa fa-play fa-2x" aria-hidden="true" /><div className="slash">/</div><i className="fa fa-stop fa-2x" aria-hidden="true" /></div>
                </div>
              </div>
              <ScrewPlate />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default drumMachine;