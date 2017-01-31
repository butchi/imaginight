import React from 'react';
import Player from './player.jsx';
import CharacterLi from '../config/character-list';

export default class Party extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){
  //   this.setState({
  //     chara : this.chara,
  //   });
  // }

  handleAddPlayer(playerData) {
    this.setState({
      playerData: playerData
    });
  }

  handleSelect() {
    this.props.handleSelect();
  }

  render() {
    for(let i = 0; i < this.props.charaLen; i++) {
      let player = _.sample(CharacterLi);
      player.alive = true;

      // this.handleAddPlayer(player);

      return (
        <Player handleSelect={() => this.handleSelect()} playerData={player} key={i} />
      );
    }

    return (
      <div className="party" data-party-id={this.props.party}>{playerArr}</div>
    );
  }
}
