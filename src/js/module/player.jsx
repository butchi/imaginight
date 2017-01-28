import React from 'react';
import Complex from './Complex';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player" data-alive={this.props.alive}>
        <h2>{this.props.name}</h2>
        <div className="hp">HP: {Complex(this.props.hp).str}</div>
        <div className="map-hp" data-hp-real={Complex(this.props.hp).re} data-hp-imag={Complex(this.props.hp).im}>
          <div className="cur"></div>
        </div>
      </div>
    );
  }
}
