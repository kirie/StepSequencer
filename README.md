# StepSequencer [Live Demo](https://kirie.github.io/StepSequencer)

A simple TR-808 inspired drum step sequencer using React and Tone.js.  Each of the eight horizontal rows represents a single sample sound with 16 steps of 16th notes(4/4 time) per side.  The sequencer pattern spans a total of 32 steps or 2 bar measures.  The A/B switch toggles the 2nd set of 16th notes.  The rows are unlabeled.


### Motivation

Create something interesting using Web Audio and to test the new codesplitting with Webpack 2.


### Features

* Codesplit bundles using Webpack 2(bundle.js and vendor.js)
* A/B side pattern switch
* Classic TR-808 colours
* Master 2-bus fader(WIP)


### Installing dev

```
npm install
npm run servedev
```


## Built With

* [React](https://github.com/facebook/react)
* [Tone.js](https://tonejs.github.io)


## Author

* [kirie](https://github.com/kirie)
