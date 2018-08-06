<template lang="pug">
.stage(
  v-bind:data-phase="phase"
)
  player-list(
    v-bind:playerArr="playerArr"
    v-bind:handleSelect="handleSelect"
  )
  command-index
  command-panel(
    v-if="currentPlayer"
    v-bind:ability="ability"
    v-bind:command="command"
    v-bind:handleCommand="handleCommand"
  )
  command-history(
    v-bind:back="back"
    v-bind:attackArr="attackArr"
    v-bind:isReady="isReady"
    v-bind:attack="attack"
  )
</template>

<script>
import _ from 'lodash';

import { mapState, mapActions, mapGetters } from 'vuex';

import Complex from "@/js/lib/complex"
import { characterLi, nameArr } from '@/js/lib/character-list';
import commandLi from '@/js/lib/command-list';
import playerList from '@/vue/components/module/player-list.vue';
import commandIndex from '@/vue/components/module/command-index.vue';
import commandPanel from '@/vue/components/module/command-panel.vue';
import commandHistory from '@/vue/components/module/command-history.vue';

export default {
  name: 'stage',
  components: {
    playerList,
    commandIndex,
    commandPanel,
    commandHistory,
  },
  props: {
  },
  data() {
    return {
      charaLen: 8,
      currentPartyIndex: 0,
      currentPlayerIndex: 0,
      attackArr: [],
      command: {},
      phase: "select",
    };
  },
  methods: {
    ...mapActions([ 'updatePlayerArr' ]),
    next() {
      if(this.currentPlayer) {
        this.currentPlayer.active = false;
      }

      do {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.charaLen;
      } while (!this.currentPlayer.alive);

      this.currentPlayer.active = true;

      this.currentPlayer.special.desc = this.currentPlayer.special.desc || this.currentPlayer.special.func.desc;

      this.command = (this.command && this.command.type === 'default') ? this.command : this.currentPlayer.special;
    },

    back() {
      this.attackArr.pop();

      if(this.currentPlayer) {
        this.currentPlayer.active = false;
      }

      if (this.currentPlayer.index === this.anchor.index && this.phase === 'ready') {
        this.currentPlayer.active = true;
      } else {
        do {
          this.currentPlayerIndex = (this.currentPlayerIndex + this.charaLen - 1) % this.charaLen;
        } while (!this.currentPlayer.alive);

        this.currentPlayer.active = true;

        this.currentPlayer.special.desc = this.currentPlayer.special.desc || this.currentPlayer.special.func.desc;

        this.command = (this.command && this.command.type === 'default') ? this.command : this.currentPlayer.special;
      }

      this.phase = 'select';
    },

    reset() {
      this.playerArr.forEach((player) => {
        player.active = false;
      });
    },

    attack() {
      this.reset();

      const finalAttack = _.last(this.attackArr);

      // promise notation from [JavaScriptのPromiseとarray.reduceを合わせて使う - yuw27b’s blog](http://yuw27b.hatenablog.com/entry/2015/09/30/235835)
      const attackPromise = (attack) => {
        return new Promise(resolve => {
          const attacker =  attack.attacker;
          const target =    attack.target;
          const command =   attack.command;

          // let gain;

          if(attacker.alive) {
            const result = command.func({
              target,
              attacker,
            });

            // gain = Math.sign(CMath.abs(result.hp) - CMath.abs(Complex(target.hp)));
            target.hp = result.hp || target.hp;

            this.playerArr[attacker.index].attacking = true;
            this.playerArr[target.index].attacked = true;
          }

          if(Complex(target.hp) === Complex([0, 0])) {
            target.alive = false;
          } else {
            target.alive = true;
          }

          setTimeout(() => {
            this.playerArr[attacker.index].attacking = false;
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
            this.playerArr[target.index].attacked = false;

            setTimeout(() => {
              resolve();
            }, 600);
          }, 1000);

          if(attack === finalAttack) {
            this.phase = 'select';
            this.currentPartyIndex = (this.currentPartyIndex + 1) % 2,
            // this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.props.charaLen,
            this.attackArr = [];

            this.next();
          }
        });
      };

      this.attackArr.reduce((prevValue, currentValue) => {
        return prevValue.then(() => {
          return attackPromise(currentValue);
        });
      }, Promise.resolve());
    },

    handleSelect(target) {
      if(this.phase !== 'select') {
        return;
      }

      let attack = {
        attacker: this.currentPlayer,
        target: target,
        command: this.command || this.currentPlayer.special,
      };

      this.attackArr.push(attack);

      if(this.currentPlayer.index === this.anchor.index) {
        this.phase = 'ready';
        return;
      } else {
        this.next();
      }
    },

    handleCommand(command) {
      this.command = command;
    },
  },
  computed: {
    ...mapState([ 'playerArr' ]),
    ability() {
      const ability = commandLi.defaultAbility;
      ability.special = this.special;
      return ability;
    },
    currentPlayer() {
      return this.playerArr[this.currentPlayerIndex];
    },
    anchor() {
      return _.findLast(this.playerArr, {
        party: this.currentPartyIndex,
        alive: true,
      });
    },
    special() {
      return this.currentPlayer.special;
    },
    isReady() {
      return this.phase === 'ready';
    },
  },
  mounted() {
    const playerArr = [];

    let shuffleNameArr = _.shuffle(nameArr);

    for(let i = 0; i < this.charaLen; i++) {
      let player = _.clone(_.sample(characterLi));

      player.name = shuffleNameArr[i] || player.name;

      player.alive = true;

      player.index = i;

      player.order = i % 4;

      player.party = i < 4 ? 0 : 1;

      player.active = false;

      player.attacking = false;

      player.attacked = false;

      playerArr.push(player);
    }

    this.updatePlayerArr(playerArr);

    let player = this.playerArr[this.currentPlayerIndex];
    player.active = true;

    player.special.desc = player.special.desc || player.special.func.desc;
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.stage {
  position: absolute;

  left: px(10);
  top: px(50);

  &[data-phase="select"] {
    .player:hover {
      background-color: #fcc;
      cursor: pointer;
    }
  }

  .player[data-attacking="1"] {
    transform: translateY(px(-20));
  }

  // &:nth-child(1) {
  //   .player.attacking {
  //     transform: translateY(20px);
  //   }
  // }
  // &:nth-child(2) {
  //   .player.attacking {
  //     transform: translateY(-20px);
  //   }
  // }

  // clearfix
  &:after {
    content: ".";
    display: block;
    height: 0;
    font-size: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>
