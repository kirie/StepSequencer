import React, { Component, PropTypes } from 'react';

class Knob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      deg: 0
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onMouseDown(e) {
    e.preventDefault();
    this.setState({ isDragging: true });
  }

  onMouseUp(e) {
    e.preventDefault();
    this.setState({ isDragging: false });
  }

  onMouseMove(e) {
    const { radius } = this.props;
    if (this.state.isDragging) {
      const mPos = {x: e.clientX, y: e.clientY};
      const atan = Math.atan2(mPos.x - radius, mPos.y - radius) * -(180/ Math.PI);
      console.log(atan);
      let deg = -atan/(Math.PI/180) + 90;
      // final (0-360 positive) degrees from mouse position
      // for attraction to multiple of 90 degrees
      if (deg === 360) {
        deg = 0;
      };
      this.setState({ deg: deg });
    }
  };

  handleChange(e) {
    const deg = e.target.value;
    this.setState({ deg });
  };

  render() {
    const { deg } = this.state;
    const { radius } = this.props;
    return (
      <div>
        <div className="knob-wrapper"
          style={{
            width: `${2*radius}px`,
            height: `${2*radius}px`
          }}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        >
        <span
          style={{
            transform: `rotate(${deg}deg)`,
            height: `${2*radius}px`
          }}
          className="knob-handler" />
        </div>
                <input
          onChange={this.handleChange}
          value={Math.round(deg)}
          min="0"
          max="360"
          type="number"
        />

      </div>
    );
  }
}

Knob.propTypes = {
  value: PropTypes.number,
  radius: PropTypes.number
};

Knob.defaultProps = {
  value: 0,
  radius: 25
};

export default Knob;
