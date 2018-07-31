<template lang="pug">
.player(
  v-if="player"
  v-bind:data-alive="alive ? 1 : 0"
  v-bind:data-party="party ? 1 : 0"
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
    v-bind:data-hp-real="hpReal"
    v-bind:data-hp-imag="hpImag"
  )
    .cur
</template>

<script>
import Complex from "@/js/lib/complex"

export default {
  name: 'player',
  props: {
    player: Object,
    handleSelect: Function,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    party() {
      return 0;
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
  position: relative;

  width: px(206);
  height: px(304);
  float: left;

  margin: px(10) px(10);

  padding: px(10);

  box-shadow: px(1) px(1) px(3) #ccc;

  background-color: #fff;

  transition: transform 0.2s ease-in 0s;

  border: px(4) solid transparent;

  &::after {
    content: "";

    position: absolute;

    left: px(-4);
    top: px(-4);

    width: px(206);
    height: px(304);

    border: px(2) solid;
  }

  &[data-party="0"] {
    &::after {
      border-color: #99f;
    }
  }
  &[data-party="1"] {
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

    font-size: px(20);
  }

  .job {
    font-size: px(12);
    font-weight: bold;
    color: $gray;
  }

  .hp {
    margin-top: px(5);
    font-size: px(14);

    .fa {
      width: 0.15rem;
      text-align: center;
    }
  }

  .special {
    font-size: px(14);

    .fa {
      width: 0.15rem;
      text-align: center;
    }
  }

  .map-hp {
    position: relative;

    width: px(181);
    height: px(181);

    background-image: image-url("grid.png");
    background-size: cover;
    background-repeat: no-repeat;

    font-size: 0;

    &.center {
      position: absolute;

      left: px(80);
      top: px(80);

      width: px(19);
      height: px(19);

      background-color: #f99;

      border: 1px solid #ccc;
    }

    &::before {
      content: "";

      @extend .center;
    }

    .cur {
      position: absolute;

      width: px(21);
      height: px(21);
      border-radius: px(21);

      background-color: #000;

      transform: scale(0.5);
    }

    @for $x from -4 through 4 {
      &[data-hp-real="#{$x}"] {
        .cur {
          left: px(($x + 4) * 20);
        }
      }
    }

    @for $y from -4 through 4 {
      &[data-hp-imag="#{$y}"] {
        .cur {
          top: px((- $y + 4) * 20);
        }
      }
    }
  }
}
</style>
