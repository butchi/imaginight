import React from 'react';
import Complex from './Complex';
import CharacterLi from '../config/character-list';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.chara = _.sample(CharacterLi);
  }

  render() {
    return (
      <div className="player" data-alive={this.chara.alive}>
        <h2>{this.chara.name}</h2>
        <div className="hp">HP: {Complex(this.chara.hp).str}</div>
        <div className="power">POW: {this.chara.operator}{Complex(this.chara.power).str}</div>
        <div className="map-hp" data-hp-real={Complex(this.chara.hp).re} data-hp-imag={Complex(this.chara.hp).im}>
          <div className="cur"></div>
        </div>
      </div>
    );
  }
}
