webpackJsonp([1,2],{

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(32);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _drum_machine = __webpack_require__(82);

var _drum_machine2 = _interopRequireDefault(_drum_machine);

__webpack_require__(83);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(_drum_machine2.default, null);
};

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _tone = __webpack_require__(54);

var _tone2 = _interopRequireDefault(_tone);

var _position = __webpack_require__(86);

var _position2 = _interopRequireDefault(_position);

var _patterns = __webpack_require__(85);

var _null_track = __webpack_require__(84);

var _channel_row = __webpack_require__(87);

var _channel_row2 = _interopRequireDefault(_channel_row);

var _progress_bar = __webpack_require__(89);

var _progress_bar2 = _interopRequireDefault(_progress_bar);

var _screws = __webpack_require__(90);

var _screws2 = _interopRequireDefault(_screws);

var _playbar = __webpack_require__(88);

var _playbar2 = _interopRequireDefault(_playbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var drumMachine = function (_Component) {
  _inherits(drumMachine, _Component);

  function drumMachine(props) {
    _classCallCheck(this, drumMachine);

    var _this = _possibleConstructorReturn(this, (drumMachine.__proto__ || Object.getPrototypeOf(drumMachine)).call(this, props));

    _this.abswitch = _this.abswitch.bind(_this);
    _this.updatePattern = _this.updatePattern.bind(_this);
    _this.startStop = _this.startStop.bind(_this);
    _this.changeTempo = _this.changeTempo.bind(_this);
    _this.changeVolume = _this.changeVolume.bind(_this);
    _this.clearPattern = _this.clearPattern.bind(_this);
    _this.positionMarker = _this.positionMarker.bind(_this);

    _this.state = {
      bpm: 94,
      position: 0,
      volume: -6,
      playing: false,
      bside: false,
      currentPattern: _patterns.demoTrack
    };

    _this.sampleOrder = ['BD', 'SD', 'CL', 'CA', 'LT', 'CH', 'OH', 'HT'];

    var multSampler = new _tone2.default.MultiPlayer({
      urls: {
        BD: './assets/samples/Kick.wav',
        SD: './assets/samples/Snare.wav',
        CL: './assets/samples/Clap.wav',
        CA: './assets/samples/Clave.wav',
        LT: './assets/samples/LowTom.wav',
        CH: './assets/samples/ClosedHat.wav',
        OH: './assets/samples/OpenHat.wav',
        HT: './assets/samples/HighTom.wav'
      }
    }).toMaster();

    var steps = Array(32).fill(1).map(function (v, i) {
      return i;
    });

    var getColumns = function getColumns(track) {
      var result = [];

      var _loop = function _loop(i) {
        result.push(track.map(function (v, idx) {
          return v[i] ? _this.sampleOrder[idx] : null;
        }).filter(function (v) {
          return v;
        }));
      };

      for (var i = 0; i < 32; i += 1) {
        _loop(i);
      }
      return result;
    };

    _this.columnPattern = getColumns(_this.state.currentPattern);

    _this.playSeq = new _tone2.default.Sequence(function (time, value) {
      _this.columnPattern[value].forEach(function (v) {
        return multSampler.start(v, time, 0, '16n', 0);
      });
    }, steps, '16n');

    _this.playSeq.start();
    _this.playSeq.loop = true;

    _tone2.default.Transport.setLoopPoints(0, '2m');
    _tone2.default.Transport.loop = true;
    _tone2.default.Transport.scheduleRepeat(_this.positionMarker, '16n');
    _tone2.default.Transport.bpm.value = _this.state.bpm;
    _tone2.default.Master.volume.value = _this.state.volume;
    return _this;
  }

  _createClass(drumMachine, [{
    key: 'clearPattern',
    value: function clearPattern() {
      this.setState({ currentPattern: _null_track.nullTrack });
    }
  }, {
    key: 'positionMarker',
    value: function positionMarker() {
      this.setState({ position: _position2.default[_tone2.default.Transport.position.slice(0, 5)] });
    }
  }, {
    key: 'startStop',
    value: function startStop() {
      if (this.state.playing) {
        _tone2.default.Transport.stop();
        this.setState({ playing: false });
      } else {
        _tone2.default.Transport.start('+0.25');
        this.setState({ playing: true });
      }
    }
  }, {
    key: 'changeTempo',
    value: function changeTempo(e) {
      var newTempo = parseInt(e.currentTarget.value, 10);
      if (isNaN(newTempo)) {
        newTempo = 10;
      }
      if (newTempo > 200) {
        newTempo = 200;
      }
      _tone2.default.Transport.bpm.value = newTempo;
      this.setState({ bpm: newTempo });
    }
  }, {
    key: 'updatePattern',
    value: function updatePattern(event) {
      var channelNum = parseInt(event.currentTarget.dataset.channel, 10);
      var stepNum = parseInt(event.currentTarget.dataset.stepindx, 10);
      var cpattern = this.state.currentPattern;
      if (cpattern[channelNum][stepNum]) {
        cpattern[channelNum][stepNum] = null;
        var colpattemp = this.columnPattern[stepNum].slice();
        var target = colpattemp.indexOf(this.sampleOrder[channelNum]);
        colpattemp.splice(target, 1);
        this.columnPattern[stepNum] = colpattemp;
        this.setState({ currentPattern: cpattern });
      } else {
        var newSamp = this.sampleOrder[channelNum];
        this.columnPattern[stepNum].push(newSamp);
        cpattern[channelNum][stepNum] = true;
        this.setState({ currentPattern: cpattern });
      }
      this.setState({ currentPattern: cpattern });
    }
  }, {
    key: 'abswitch',
    value: function abswitch() {
      this.setState({ bside: !this.state.bside });
    }
  }, {
    key: 'changeVolume',
    value: function changeVolume(e, value) {
      this.setState({ volume: value });
      if (value < -40) {
        value = -100;
      }
      _tone2.default.Master.volume.value = value;
    }
  }, {
    key: 'render',
    value: function render() {
      function makeSeqRow(v, i) {
        var pattern = void 0;
        if (this.state.bside) {
          pattern = v.slice(16);
        } else {
          pattern = v.slice(0, 16);
        }
        return _react2.default.createElement(_channel_row2.default, {
          bside: this.state.bside,
          key: i + 'row',
          channelNum: i,
          updateSeq: this.updatePattern,
          channel: pattern
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'rackcabinet' },
        _react2.default.createElement(
          'div',
          { className: 'rack' },
          _react2.default.createElement(
            'div',
            { className: 'drumrack' },
            _react2.default.createElement(_screws2.default, null),
            _react2.default.createElement(_progress_bar2.default, { prog: this.state.position }),
            this.state.currentPattern.map(makeSeqRow, this),
            _react2.default.createElement(_playbar2.default, {
              bpm_num: this.state.bpm,
              toggle_f: this.abswitch,
              tempo_f: this.changeTempo,
              playbutton_f: this.startStop
            }),
            _react2.default.createElement(_screws2.default, null)
          )
        )
      );
    }
  }]);

  return drumMachine;
}(_react.Component);

exports.default = drumMachine;

/***/ },

/***/ 83:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nullTrack = exports.nullTrack = [[true, null, null, null, null, null, null, true, true, null, true, null, true, null, null, true, true, null, null, null, null, null, null, null, true, null, null, null, null, null, null, true], [null, null, null, null, null, null, null, null, null, null, true, true, null, null, null, null, null, null, null, null, null, null, true, true, null, true, null, true, null, true, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null], [true, null, null, true, null, true, null, null, null, null, null, null, null, null, null, null, true, null, null, true, null, null, true, null, null, null, true, null, null, true, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, true, null], [true, null, true, true, true, null, true, null, true, null, true, null, true, null, true, true, true, null, true, null, true, null, true, null, true, true, true, null, true, null, true, true], [null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, true, null, null, null, true, null, null, true, null, null], [null, null, true, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null, null, null]];

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var demoTrack = exports.demoTrack = [[true, null, null, null, null, null, null, true, true, null, true, null, true, null, null, true, true, null, null, null, null, null, null, null, true, null, null, null, null, null, null, true], [null, null, null, null, null, null, null, null, null, null, true, true, null, null, null, null, null, null, null, null, null, null, true, true, null, true, null, true, null, true, null, null], [null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null], [true, null, null, true, null, null, true, null, null, null, null, null, null, null, null, null, true, null, null, true, null, null, true, null, null, null, true, null, null, true, null, null], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, true, null], [true, null, true, true, true, null, true, null, true, null, true, null, true, null, true, true, true, null, true, null, true, null, true, null, true, true, true, null, true, null, true, true], [null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, true, null, null, null, true, null, null, true, null, null], [null, null, true, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, true, null, null, null, null, null, null, null, null, null, null, null, null, null]];

/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  '0:0:0': 0,
  '0:0:1': 1,
  '0:0:2': 2,
  '0:0:3': 3,
  '0:1:0': 4,
  '0:1:1': 5,
  '0:1:2': 6,
  '0:1:3': 7,
  '0:2:0': 8,
  '0:2:1': 9,
  '0:2:2': 10,
  '0:2:3': 11,
  '0:3:0': 12,
  '0:3:1': 13,
  '0:3:2': 14,
  '0:3:3': 15,
  '1:0:0': 0,
  '1:0:1': 1,
  '1:0:2': 2,
  '1:0:3': 3,
  '1:1:0': 4,
  '1:1:1': 5,
  '1:1:2': 6,
  '1:1:3': 7,
  '1:2:0': 8,
  '1:2:1': 9,
  '1:2:2': 10,
  '1:2:3': 11,
  '1:3:0': 12,
  '1:3:1': 13,
  '1:3:2': 14,
  '1:3:3': 15
};

/***/ },

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var channelRow = function channelRow(props) {
  function makeRow(v, i) {
    var channelClasses = v ? 'lighton' : 'lightoff';
    return _react2.default.createElement(
      'div',
      {
        className: 'stepbutton',
        'data-channel': props.channelNum,
        'data-stepindx': props.bside ? i + 16 : i,
        onClick: props.updateSeq,
        key: 'c' + v + 's' + i
      },
      _react2.default.createElement('div', { className: channelClasses })
    );
  }

  return _react2.default.createElement(
    'div',
    { className: 'sequencerrow' },
    props.channel.map(makeRow, undefined)
  );
};

channelRow.propTypes = {
  channelNum: _react.PropTypes.number.isRequired,
  bside: _react.PropTypes.bool.isRequired,
  updateSeq: _react.PropTypes.func.isRequired,
  channel: _react.PropTypes.array.isRequired
};

exports.default = channelRow;

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _toggle = __webpack_require__(91);

var _toggle2 = _interopRequireDefault(_toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playBar = function playBar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'drumrackbar' },
    _react2.default.createElement(
      'div',
      { className: 'drumracklabel' },
      'SEQUENCE'
    ),
    _react2.default.createElement(_toggle2.default, { abfunc: props.toggle_f }),
    _react2.default.createElement(
      'div',
      { className: 'bpmplaybar' },
      _react2.default.createElement('input', { type: 'number', className: 'tempolabel', onChange: props.tempo_f, value: props.bpm_num }),
      _react2.default.createElement(
        'div',
        { className: 'playstopbutton', onClick: props.playbutton_f },
        _react2.default.createElement('i', { className: 'fa fa-play fa-2x', 'aria-hidden': 'true' }),
        _react2.default.createElement(
          'div',
          { className: 'slash' },
          '/'
        ),
        _react2.default.createElement('i', { className: 'fa fa-stop fa-2x', 'aria-hidden': 'true' })
      )
    )
  );
};

playBar.propTypes = {
  bpm_num: _react.PropTypes.number.isRequired,
  toggle_f: _react.PropTypes.func.isRequired,
  tempo_f: _react.PropTypes.func.isRequired,
  playbutton_f: _react.PropTypes.func.isRequired
};

exports.default = playBar;

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var progressBar = function progressBar(props) {
  var temp = Array(16).fill(1);
  var temp2 = temp.map(function (v, i) {
    if (i === props.prog) {
      return _react2.default.createElement("div", {
        className: "progresslighton",
        key: v + "prog" + i
      });
    }
    return _react2.default.createElement("div", { className: "progresslight", key: v + "prog" + i });
  });
  return _react2.default.createElement(
    "div",
    { className: "progressbar" },
    temp2
  );
};

progressBar.propTypes = {
  prog: _react.PropTypes.number.isRequired
};

exports.default = progressBar;

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    "div",
    { className: "screwplate" },
    _react2.default.createElement("div", { className: "screw" }),
    _react2.default.createElement("div", { className: "screw" })
  );
};

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle(props) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

    _this.state = {
      toggled: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(Toggle, [{
    key: 'handleChange',
    value: function handleChange() {
      this.props.abfunc();
      this.setState({ toggled: !this.state.toggled });
    }
  }, {
    key: 'render',
    value: function render() {
      var toggleClasses = 'togglebox';
      if (this.state.toggled) {
        toggleClasses += ' toggled';
      }

      return _react2.default.createElement(
        'div',
        {
          className: toggleClasses,
          onClick: this.handleChange
        },
        _react2.default.createElement(
          'div',
          { className: 'lettera' },
          'A'
        ),
        _react2.default.createElement(
          'div',
          { className: 'toggle-slider' },
          _react2.default.createElement('div', { className: 'toggle-slider-button' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'letterb' },
          'B'
        )
      );
    }
  }]);

  return Toggle;
}(_react.Component);

Toggle.propTypes = {
  abfunc: _react.PropTypes.func.isRequired
};

exports.default = Toggle;

/***/ }

},[188]);