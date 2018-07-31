<template lang="pug">
.player(
  v-if="player"
  v-bind:data-alive="alive ? 1 : 0"
  v-bind:data-party="party ? 1 : 0"
  v-bind:data-order="order"
  v-bind:data-active="active ? 1 : 0"
  v-bind:data-attacked="attacked ? 1 : 0"
  v-on:click="handleSelect(player)"
)
  h2.name
    | {{ name }}
  .job
    | {{ job }}
  .hp
    i.fa.fa-heart(aria-hidden="true")
    |  
    | HP: {{ hpStr }}
  .special
    i.fa.fa-bolt(aria-hidden="true")
    |  
    | 特殊技: {{ specialName }}
  .map-hp(
    v-bind:style="{'background-image': `url(${grid})`}"
    v-bind:data-hp-real="hpReal"
    v-bind:data-hp-imag="hpImag"
  )
    .cur
</template>

<script>
import Complex from "@/js/lib/complex"
import gridImg from "@/img/grid.png";

export default {
  name: 'player',
  props: {
    player: Object,
    handleSelect: Function,
  },
  data() {
    return {
      grid: gridImg,
    };
  },
  methods: {
  },
  computed: {
    party() {
      return this.player.party;
    },
    order() {
      return this.player.order;
    },
    name() {
      return this.player.name;
    },
    job() {
      return this.player.job;
    },
    hpStr() {
      return Complex(this.player.hp).str;
    },
    specialOperator() {
      return this.player.special.operator;
    },
    specialName() {
      return this.player.special.name;
    },
    alive() {
      return this.player.alive;
    },
    active() {
      return this.player.active;
    },
    attacking() {
      return this.player.attacking;
    },
    attacked() {
      return this.player.attacked;
    },
    hpReal() {
      return Complex(this.player.hp).re;
    },
    hpImag() {
      return Complex(this.player.hp).im;
    },
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.player {
  position: absolute;

  width: px(150);
  height: px(230);
  float: left;

  padding: px(7);

  box-shadow: px(1) px(1) px(3) #ccc;

  background-color: #fff;

  transition: transform 0.2s ease-in 0s;

  border: px(4) solid transparent;

  &::after {
    content: "";

    position: absolute;

    left: px(-4);
    top: px(-4);

    width: px(146);
    height: px(226);

    border: px(2) solid;
  }

  @for $i from 0 to 4 {
    &[data-order="#{$i}"] {
      left: px($i * 160);
    }
  }

  &[data-party="0"] {
    top: px(0);

    &::after {
      border-color: #99f;
    }
  }
  &[data-party="1"] {
    top: px(260);

    &::after {
      border-color: #f99;
    }
  }

  &[data-active="1"] {
    &[data-party="0"] {
      animation: blink-blue 1s linear 0s infinite alternate;
    }
    &[data-party="1"] {
      animation: blink-red 1s linear 0s infinite alternate;
    }
  }

  &[data-attacking="1"] {
    transition: transform 0.2s ease-out 0s;
  }

  &[data-attacked="1"] {
    transform: scale(1.1);
    transition: transform 0.2s ease-out 0s;
  }

  &[data-alive="0"] {
    background-color: #ccc;
  }

  .name {
    margin: 0;

    font-size: px(14);
  }

  .job {
    font-size: px(8);
    font-weight: bold;
    color: $gray;
  }

  .hp {
    margin-top: px(5);
    font-size: px(9);

    .fa {
      width: 0.1rem;
      text-align: center;
    }
  }

  .special {
    font-size: px(8);

    .fa {
      width: 0.1rem;
      text-align: center;
    }
  }

  .map-hp {
    position: absolute;

    left: px(8);
    bottom: px(8);

    width: px(127);
    height: px(127);

    background-size: px(127);
    background-repeat: no-repeat;

    font-size: 0;

    &.center {
      position: absolute;

      left: px(56);
      top: px(56);

      width: px(13);
      height: px(13);

      background-color: #f99;

      border: 1px solid #ccc;
    }

    &::before {
      content: "";

      @extend .center;
    }

    .cur {
      position: absolute;

      width: px(15);
      height: px(15);
      border-radius: px(15);

      background-color: #000;

      transform: scale(0.5);
    }

    @for $x from -4 through 4 {
      &[data-hp-real="#{$x}"] {
        .cur {
          left: px(($x + 4) * 14);
        }
      }
    }

    @for $y from -4 through 4 {
      &[data-hp-imag="#{$y}"] {
        .cur {
          top: px((- $y + 4) * 14);
        }
      }
    }
  }
}
</style>
