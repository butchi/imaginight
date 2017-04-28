import React from 'react'
import { connect } from 'react-redux'
import { attack } from '../actions'

let Attack = ({ dispatch }) => {
  // var attacker =  attack.attacker;
  // var target =    attack.target;
  // var command =   attack.command;

  // let result = command.func({
  //   target,
  //   attacker,
  // });

  // target.hp = result.hp || target.hp;

  // this.setState({
  // });

  // if(Complex(target.hp) === Complex([0, 0])) {
  //   target.alive = false;
  // } else {
  //   target.alive = true;
  // }

  return (
    <div className="attack">
    </div>
  )
}
Attack = connect()(Attack)

export default Attack
