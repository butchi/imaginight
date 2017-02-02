import React from 'react';
import Complex from './Complex';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.onSelect();
  }

  render() {
    return (
      <div className="player" onClick={() => {this.handleClick()}} data-alive={this.props.alive ? 1 : 0} data-active={this.props.active ? 1 : 0} data-attacking={this.props.attacking ? 1 : 0} data-attacked={this.props.attacked ? 1 : 0}>
        <h2 className="name">{this.props.name}</h2>
        <div className="job">{this.props.job}</div>
        <div className="hp">HP: {Complex(this.props.hp).str}</div>
        <div className="special">特殊技: {this.props.special}</div>
        <div className="map-hp" data-hp-real={Complex(this.props.hp).re} data-hp-imag={Complex(this.props.hp).im}>
          <div className="cur"></div>
        </div>
      </div>
    );
  }
}
