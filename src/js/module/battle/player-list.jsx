import React from 'react';
import Player from './player.jsx';

export default class PlayerList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSelect(target) {
    this.props.onSelect(target);
  }

  render() {
    let PlayerNodes = this.props.playerData.map((player, index) => {
      return <Player party={player.party} name={player.name} job={player.job} hp={player.hp} operator={player.special.operator} special={player.special.name} alive={player.alive} active={player.active} attacking={player.attacking} attacked={player.attacked} onSelect={() => this.handleSelect(player)} key={index} />;
    });

    return (
      <div>{PlayerNodes}</div>
    );
  }
}