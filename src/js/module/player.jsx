import React from 'react';
import Complex from './Complex';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.charaArr = [
      {
        name: "Knight",
        hp: [4,0],
        operator: "-",
        power: [1,0],
        job: "knight",
        playerId: "0",
        partyIndex: "0",
        playerIndex: "0",
        alive: "1",
      },
      {
        name: "Dark Knight",
        hp: [-4,0],
        operator: "-",
        power: [1,0],
        job: "darkknight",
        playerId: "0",
        partyIndex: "0",
        playerIndex: "0",
        alive: "1",
      },
      {
        name: "Magician",
        hp: [0,3],
        operator: "*",
        power: [0,1],
        job: "magician",
        playerId: "0",
        partyIndex: "0",
        playerIndex: "0",
        alive: "1",
      },
      {
        name: "Healer",
        hp: [3,0],
        operator: "+",
        power: [1,0],
        job: "knight",
        playerId: "0",
        partyIndex: "0",
        playerIndex: "0",
        alive: "1",
      },
    ];

    this.chara = this.charaArr[this.props.charaIndex];
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
