import React from 'react';
import Player from './player.jsx';

export default class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let playerArr = [];
    for(let i = 0; i < this.props.charaLen; i++) {
      playerArr.push(<Player key={i} onStateChange={this.onStateChange} charaIndex={i} />)
    }

    return (
      <div className="party" data-party-id={this.props.party}>{playerArr}</div>
    );
  }
}
