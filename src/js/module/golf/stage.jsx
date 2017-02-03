import React from 'react';
import Complex from '../Complex';
import CMath from '../CMath';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: [0,0],
      hitsotry: null,
    };
  }

  componentDidMount() {
    this.setState({
    });
  }

  back() {
  }

  attack() {
    var attacker =  attack.attacker;
    var target =    attack.target;
    var command =   attack.command;

    let result = command.func({
      target,
      attacker,
    });

    target.hp = result.hp || target.hp;

    this.setState({
    });

    if(Complex(target.hp) === Complex([0, 0])) {
      target.alive = false;
    } else {
      target.alive = true;
    }
  }

  handleSelect(target) {
    let attack = {
      attacker: attacker,
      target: target,
      command: this.state.command || attacker.special,
    };

    this.setState ({
      attack,
    });
  }

  handleCommand(command) {
    this.state.command = command;
  }

  handleBack() {
    this.setState({
      hp,
    });

    this.back();
  }

  render() {
    return (
      <div />
    );
  }
}
