import Player from './module/Player';
import {CMath} from './module/CMath';

const phaseLi = {
  SELECT: 'select',
  ATTACK: 'attack',
}

class MainController {
  constructor() {
    this.partyArr = [];
    this.playerArr = [];
    var playerId = 0;

    this.$stage = $('.stage');

    this.$stage.find('.party').each((partyIndex, partyElm) => {
      this.partyArr[partyIndex] = [];

      $(partyElm).find('.player').each((playerIndex, playerElm) => {
        let $playerElm = $(playerElm);
        let job = $playerElm.attr('data-job');
        let hp = $playerElm.attr('data-hp');
        let operation = $playerElm.attr('data-operation');
        let power = $playerElm.attr('data-power');

        let player = new Player({
          playerId: playerId,
          partyIndex: partyIndex,
          $party: $(partyElm),
          playerIndex: playerIndex,
          $elm: $playerElm,
          job: job,
          hp: hp,
          operation: operation,
          power: power,
        })

        this.playerArr.push(player);
        this.partyArr[partyIndex][playerIndex] = player;

        playerId++;
      });
    });

    this.start();
  }

  reset() {
    this.playerIndex = null;
    this.currentPlayer = null;

    this.currentPlayerIndex = null;

    this.playerArr.forEach((player) => {
      player.disactivate();
    });
  }

  start() {
    this.nextParty();
  }

  nextParty() {
    this.phase = phaseLi.SELECT;
    this.$stage.attr('data-phase', this.phase);

    if(this.currentPartyIndex == null) {
      this.currentPartyIndex = 0;
    } else if(this.currentPartyIndex < this.partyArr.length - 1) {
      this.currentPartyIndex++;
    } else {
      this.currentPartyIndex = 0;
    }

    this.attackArr = [];

    this.nextPlayer();
  }

  nextPlayer() {
    if(!this.phase) {
    } else if(this.phase === phaseLi.SELECT) {
      if(this.currentPlayerIndex == null) {
        this.currentPlayerIndex = 0;
      } else if(this.currentPlayerIndex < this.partyArr[this.currentPartyIndex].length - 1) {
        this.currentPlayerIndex++;
      } else {
        $('.stage').off();
        this.phase = phaseLi.ATTACK;
        this.$stage.attr('data-phase', this.phase);

        this.attack();

        return;
      }

      this.prevPlayer = this.currentPlayer;
      this.currentPlayer = this.partyArr[this.currentPartyIndex][this.currentPlayerIndex];

      this.prevPlayer && this.prevPlayer.disactivate();
      this.currentPlayer.activate();

      $('.stage').one('click', '.player', (evt) => {
        var playerId = $(evt.currentTarget).attr('data-player-id');
        var selectedPlayer = this.playerArr[playerId];

        let attack = {
          attacker: this.currentPlayer,
          target: selectedPlayer,
          operation: selectedPlayer.operation,
          operand: selectedPlayer.power,
        }

        this.attackArr.push(attack);

        this.nextPlayer();
      });
    }
  }

  attack() {
    this.reset();

    this.attackArr.forEach((attack) => {
      var attacker =  attack.attacker;
      var target =    attack.target;
      var operation = attack.operation;
      var operand =   attack.operand;

      var func;

      if(!operation) {
      } else if(operation === '+') {
        func = CMath.sum;
      } else if(operation === '-') {
        func = CMath.sub;
      } else if(operation === '*') {
        func = CMath.mult;
      }

      target.hp = func(target.hp, operand);

      target.update();
    });

    this.nextParty();
  }
}

window.licker = window.licker || {};
((ns) => {
  ns.mainController = new MainController();
})(window.licker);