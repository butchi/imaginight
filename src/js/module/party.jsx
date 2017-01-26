import React from 'react';
import Player from './player.jsx';

export default class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="party" data-party-id={this.props.party}>
        <Player onStateChange={this.onStateChange} charaIndex="0" />
        <Player onStateChange={this.onStateChange} charaIndex="1" />
        <Player onStateChange={this.onStateChange} charaIndex="2" />
        <Player onStateChange={this.onStateChange} charaIndex="3" />
      </div>
    );
  }
}
