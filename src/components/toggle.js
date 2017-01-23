import React, { Component, PropTypes } from 'react';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.abfunc();
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    let toggleClasses = 'togglebox';
    if (this.state.toggled) {
      toggleClasses += ' toggled';
    }

    return (
      <div
        className={toggleClasses}
        onClick={this.handleChange}
      >
        <div className="lettera">A</div>
        <div className="toggle-slider">
          <div className="toggle-slider-button" />
        </div>
        <div className="letterb">B</div>

      </div>
    );
  }
}

Toggle.propTypes = {
  abfunc: PropTypes.func.isRequired
};

export default Toggle;
