import React from 'react';
import Complex from './Complex';
import Player from './player.jsx';
import OperatorCard from './operator-card.jsx';
import NumberCard from './number-card.jsx';
import CMath from './CMath.js';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alive: true,
      hp: [4,3],
      operator: '-',
    };
  }

  onOperatorChange(operator) {
    this.setState({
      operator: operator,
    });
  }

  exec(_evt, power, _this) {
    let operation = {
      '+': 'sum',
      '-': 'sub',
      '*': 'mult',
    }[this.state.operator];

    let hp = CMath[operation](Complex(this.state.hp), Complex(power));

    this.setState({
      hp: [hp.re , hp.im],
    });
  }

  render() {
    return (
      <div className="stage">
        <Player alive={this.state.alive} hp={this.state.hp} />

        <OperatorCard operator="+" checked={false} onOperatorChange={(operator) => this.onOperatorChange(operator)} />
        <OperatorCard operator="-" checked={true} onOperatorChange={(operator) => this.onOperatorChange(operator)} />
        <OperatorCard operator="*" checked={false} onOperatorChange={(operator) => this.onOperatorChange(operator)} />

        <NumberCard power={[1,0]} exec={(evt, power) => this.exec(evt, power, this)} />
        <NumberCard power={[0,1]} exec={(evt, power) => this.exec(evt, power, this)} />
        <NumberCard power={[1,2]} exec={(evt, power) => this.exec(evt, power, this)} />
      </div>
    );
  }
}
