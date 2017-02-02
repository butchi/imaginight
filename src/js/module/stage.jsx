import React from 'react';
import PlayerList from './player-list.jsx';
import CharacterLi from '../config/character-list';
import Complex from './Complex';
import CMath from './CMath';
import CommandPanel from './command-panel.jsx';
import CommnadLi from './command-list';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);

    let playerArr = [];

    for(let i = 0; i < this.props.charaLen; i++) {
      let player = _.clone(_.sample(CharacterLi));
      player.alive = true;

      player.index = i;

      player.party = i < 4 ? 0 : 1;

      player.active = false;

      player.attacking = false;

      player.attacked = false;

      playerArr.push(player);
    }

    this.state = {
      charaLen: 8,
      phase: 'select',
      currentPartyIndex: null,
      currentPlayerIndex: null,
      attackArr: null,
      playerArr: playerArr,
      ability: CommnadLi.defaultAbility,
      special: {},
      command: null,
    };
  }

  componentDidMount() {
    this.state.currentPartyIndex = 0;
    this.state.currentPlayerIndex = 0;

    this.state.attackArr = [];

    let playerArr =  this.state.playerArr;

    let player = playerArr[this.state.currentPlayerIndex];
    player.active = true;

    player.special.desc = player.special.desc || player.special.func.desc;

    this.setState({
      playerArr: playerArr,
      special: player.special,
    });
  }

  next() {
    let playerArr = this.state.playerArr;
    let currentPlayerIndex = this.state.currentPlayerIndex
    let currentPlayer = this.state.playerArr[currentPlayerIndex];

    if(currentPlayer) {
      currentPlayer.active = false;
    }

    do {
      currentPlayerIndex = (currentPlayerIndex + 1) % this.props.charaLen;
      currentPlayer = this.state.playerArr[currentPlayerIndex];
    } while (!currentPlayer.alive);

    currentPlayer.active = true;

    currentPlayer.special.desc = currentPlayer.special.desc || currentPlayer.special.func.desc;

    this.setState({
      playerArr,
      currentPlayerIndex,
      special: currentPlayer.special,
      command: (this.state.command.type === 'default') ? this.state.command : currentPlayer.special,
    });

    return;
  }

  reset() {
    let playerArr = this.state.playerArr;

    playerArr.forEach((player) => {
      player.active = false;
    });

    this.setState({
      playerArr,
    });
  }

  attack() {
    this.reset();

    var finalAttack = _.last(this.state.attackArr);

    // promise notation from [JavaScriptのPromiseとarray.reduceを合わせて使う - yuw27b’s blog](http://yuw27b.hatenablog.com/entry/2015/09/30/235835)
    var attackPromise = (attack) => {
      return new Promise(resolve => {
        var attacker =  attack.attacker;
        var target =    attack.target;
        var command =   attack.command;

        // var gain;

        let playerArr = this.state.playerArr;

        if(attacker.alive) {
          let result = command.func({
            target,
            attacker,
          });

          // gain = Math.sign(CMath.abs(result.hp) - CMath.abs(Complex(target.hp)));
          target.hp = result.hp || target.hp;

          playerArr[attacker.index].attacking = true;
          playerArr[target.index].attacked = true;

          this.setState({
            playerArr,
          });
        }

        if(Complex(target.hp) === Complex([0, 0])) {
          target.alive = false;
        } else {
          target.alive = true;
        }

        setTimeout(() => {
          playerArr[attacker.index].attacking = false;

          this.setState({
            playerArr,
          });
        }, 1000);

        //   target.update();
        //   // ダメージ色分け（バグあり）
        //   // if(gain === 0) {
        //   //   target.$elm.css({
        //   //     "background-color": '#ff6',
        //   //   });
        //   // } else if(gain > 0) {
        //   //   target.$elm.css({
        //   //     "background-color": '#66f',
        //   //   });
        //   // } else if(gain < 0) {
        //   //   target.$elm.css({
        //   //     "background-color": '#f66',
        //   //   });
        //   // }

        setTimeout(() => {
          playerArr[target.index].attacked = false;

          this.setState({
            playerArr,
          });

          setTimeout(() => {
            resolve();
          }, 600);
        }, 1000);

        if(attack === finalAttack) {
          this.setState({
            phase: 'select',
            currentPartyIndex: (this.state.currentPartyIndex + 1) % 2,
            // currentPlayerIndex: (this.state.currentPlayerIndex + 1) % this.props.charaLen,
            attackArr: [],
          });

          this.next();
        }
      });
    };

    this.state.attackArr.reduce((prevValue, currentValue) => {
      return prevValue.then(() => {
        return attackPromise(currentValue);
      });
    }, Promise.resolve());
  }

  handleSelect(target) {
    if(this.state.phase === 'attack') {
      return;
    }

    let anchor = _.findLast(this.state.playerArr, { party: this.state.currentPartyIndex, alive: true });

    let attacker = this.state.playerArr[this.state.currentPlayerIndex];

    let attack = {
      attacker: attacker,
      target: target,
      command: this.state.command || this.attacker.special,
    };

    this.state.attackArr.push(attack);

    if(attacker.index === anchor.index) {
      this.setState ({
        phase: 'attack',
      });

      this.attack();
      return;
    } else {
      this.next();
    }
  }

  handleCommand(command) {
    this.state.command = command;
  }

  render() {
    return (
      <div>
        <div className="stage" data-phase={this.state.phase}>
          <PlayerList playerData={this.state.playerArr} onSelect={(player) => this.handleSelect(player)} />
        </div>
        <CommandPanel ability={this.state.ability} special={this.state.special} onCommand={(command) => this.handleCommand(command)} />
      </div>
    );
  }
}
