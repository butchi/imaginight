import React from 'react';
import Complex from './Complex';

export default class NumberCard extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(evt) {
    this.props.exec(evt, this.props.power);
  }

  render() {
    return (
      <div className="player" data-alive={this.props.alive} onClick={(evt) => this.onClick(evt)}>
        <div className="power">POW: {Complex(this.props.power).str}</div>
        <div className="map-hp" data-hp-real={Complex(this.props.power).re} data-hp-imag={Complex(this.props.power).im}>
          <div className="cur"></div>
        </div>
      </div>
    );
  }
}
