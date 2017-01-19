import React, { Component } from 'react';
import Tone from 'tone';
import PositionTransform from '../../assets/js/position';
import { demoTrack } from '../../assets/js/patterns';
import { nullTrack } from '../../assets/js/null_track';
import Samples from '../../assets/js/samples';
import ChannelRow from './channel_row';
import ProgressBar from './progress_bar';
import ScrewPlate from './screws';
import Toggle from './toggle';

class drumMachine extends Component {
  constructor(props) {
    super(props);
    this.abswitch = this.abswitch.bind(this);
    this.updatePattern = this.updatePattern.bind(this);
    this.triggerSample = this.triggerSample.bind(this);
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

    // Later
    // const multSamp = new Tone.MultiPlayer({
    //   BD: '../../assets/samples/Kick.wav',
    //   SD: '../../assets/samples/Snare.wav',
    //   CL: '../../assets/samples/Clap.wav',
    //   CA: '../../assets/samples/Clave.wav',
    //   LT: '../../assets/samples/LowTom.wav',
    //   CH: '../../assets/samples/ClosedHat.wav',
    //   OH: '../../assets/samples/OpenHat.wav',
    //   HT: '../../assets/samples/HighTom.wav'
    // }).toMaster();

    for (let i = 0; i < 8; i += 1) {
      this[`sampler${i}`] = new Tone.Sampler(Samples[i]).toMaster();
      this[`channelPattern${i}`] = new Tone.Sequence(
        this.triggerSample.bind(this, `sampler${i}`),
        this.state.currentPattern[i],
        '16n').start(0);
    }

    // Loop over 2 measures
    Tone.Transport.setLoopPoints(0, '2m');
    Tone.Transport.loop = true;

    // Repeat and call function every 16th note
    Tone.Transport.scheduleRepeat(this.positionMarker, '16n');

    // BPM and volume reflect the state
    Tone.Transport.bpm.value = this.state.bpm;
    Tone.Master.volume.value = this.state.volume;
  }
  
  triggerSample(sampler) {
    this[sampler].triggerAttackRelease(0);
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
    const temp = this.state.currentPattern;
    if (temp[channelNum][stepNum]) {
      temp[channelNum][stepNum] = null;
      this[`channelPattern${channelNum}`].remove(stepNum);
    }
    else {
      temp[channelNum][stepNum] = true;
      this[`channelPattern${channelNum}`].add(stepNum, true);
    }
    this.setState({ currentPattern: temp });
  }

  abswitch() {
    this.setState({ bside: !this.state.bside });
  }

  changeVolume(e, value) {
    this.setState({volume: value });
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