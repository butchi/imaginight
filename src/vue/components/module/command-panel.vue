<template lang="pug">
.command-panel
  div(v-for="cmd, key in ability")
    label(
      v-bind:class="key"
    )
      input(
        type="radio"
        v-bind:value="key"
        v-bind:checked="currentKey === key"
        v-on:change="handleChange(key)"
      )
      | {{ cmd.name }}
  .desc
    | {{ ability.special.name }} : {{ ability.special.desc }}
</template>

<script>
import _ from 'lodash';

export default {
  name: 'command-panel',
  props: {
    ability: Object,
    command: Object,
    handleCommand: Function,
  },
  data() {
    return {
    };
  },
  methods: {
    handleChange(key) {
      this.handleCommand(this.ability[key]);
    },
  },
  computed: {
    currentKey() {
      return this.command.id || 'auto';
    },
  },
  mounted() {
    this.handleChange('auto');
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.command-panel {
  position: absolute;

  left: px(20);
  top: px(520);

  width: px(210);

  font-size: px(10);

  .auto {
    position: absolute;
    left: px(0);
    top: px(0);
  }

  .left {
    position: absolute;
    left: px(0);
    top: px(40);
  }

  .right {
    position: absolute;
    left: px(100);
    top: px(40);
  }

  .down {
    position: absolute;
    left: px(50);
    top: px(60);
  }

  .up {
    position: absolute;
    left: px(50);
    top: px(20);
  }

  .restore {
    position: absolute;
    left: px(50);
    top: px(40);
  }

  .special {
    position: absolute;

    left: 0;
    top: px(80);
  }

  .desc {
    position: absolute;

    left: 0;
    top: px(100);
  }
}
</style>
