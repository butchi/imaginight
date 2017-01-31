import React from 'react';
import PlayerList from './player-list.jsx';
import CharacterLi from '../config/character-list';
import Complex from './Complex';
import CMath from './CMath';

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

      // this.handleAddPlayer({
      //   hp: player.hp,
      //   operator: player.operator,
      //   power: player.power,
      // });
    }

    this.state = {
      charaLen: 8,
      phase: 'select',
      currentPartyIndex: null,
      currentPlayerIndex: null,
      attackArr: null,
      playerArr: playerArr,
    };
  }

  componentDidMount (){
    this.state.currentPartyIndex = 0;
    this.state.currentPlayerIndex = 0;

    this.state.attackArr = [];

    let playerArr =  this.state.playerArr;
    playerArr[this.state.currentPlayerIndex].active = true;

    this.setState({
      playerArr: playerArr,
    });
  }

  next() {
    if(this.state.phase === 'attack') {
      this.attack();

      return;
    }

    if(this.state.phase === 'select') {
      let playerArr = this.state.playerArr;
      let currentPlayer = this.state.playerArr[this.state.currentPlayerIndex];

      if(!currentPlayer.alive) {
        this.next();
      }

      playerArr[this.state.currentPlayerIndex].active = false;

      currentPlayer = this.state.playerArr[this.state.currentPlayerIndex + 1];

      if(!currentPlayer) {
      }

      if(currentPlayer && currentPlayer.alive) {
        this.state.currentPlayerIndex++;
      }

      playerArr[this.state.currentPlayerIndex].active = true;

      if(currentPlayer.party !== this.state.currentPartyIndex) {
        this.state.phase = 'attack';

        this.next();
        return;
      }

      this.state.currentPartyIndex = currentPlayer.party;

      this.setState({
        playerArr: playerArr,
      });

      return;
    }
  }

  reset() {
  }

  attack() {
    this.reset();

    var finalAttack = _.last(this.state.attackArr);

    // promise notation from [JavaScriptのPromiseとarray.reduceを合わせて使う - yuw27b’s blog](http://yuw27b.hatenablog.com/entry/2015/09/30/235835)
    var attackPromise = (attack) => {
      return new Promise(resolve => {
        var attacker =  attack.attacker;
        var target =    attack.target;
        var operator = attack.operator;
        var operand =   attack.operand;

        var gain;

        var func;

        if(!operator) {
        } else if(operator === '+') {
          func = CMath.sum;
        } else if(operator === '-') {
          func = CMath.sub;
        } else if(operator === '*') {
          func = CMath.mult;
        }

        if(target.alive) {
          let hp = func(Complex(target.hp), Complex(operand));
          gain = Math.sign(CMath.abs(hp) - CMath.abs(Complex(target.hp)));
          target.hp = [hp.re, hp.im];
        }

        if(Complex(target.hp) === Complex([0, 0])) {
          target.alive = false;
        }

        let playerArr = this.state.playerArr;

        playerArr[attacker.index].attacking = true;
        playerArr[target.index].attacked = true;

        this.setState({
          playerArr,
        });

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
          this.state.attackArr = [];
          this.state.phase = 'select';
          this.state.currentPartyIndex = (this.state.currentPartyIndex + 1) % 2;
          this.state.currentPlayerIndex = 0;

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
    if(!target.alive) {
      return;
    }

    if(this.state.phase === 'attack') {
      return;
    }

    let attacker = this.state.playerArr[this.state.currentPlayerIndex];

    let attack = {
      attacker: attacker,
      target: target,
      operator: attacker.operator,
      operand: attacker.power,
    };

    this.state.attackArr.push(attack);

    this.next();
  }

  // handleAddPlayer(player = {}) {
  //   let data = this.state.playerData;
  //   data.push({
  //     hp: player.hp,
  //     operator: player.operator,
  //     power: player.power,
  //   });
  //   this.setState({
  //     playerData: data,
  //   });
  // }

  render() {
    return (
      <div className="stage">
        <PlayerList playerData={this.state.playerArr} onSelect={(player) => this.handleSelect(player)} />
      </div>
    );
  }
}
