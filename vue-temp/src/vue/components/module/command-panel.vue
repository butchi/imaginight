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
      return this.command.id || 'special';
    },
  },
  mounted() {
    this.handleChange('special');
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.command-panel {
  position: absolute;

  left: px(40);
  top: px(680);

  width: px(300);

  .left {
    position: absolute;
    left: px(0);
    top: px(30);
  }

  .right {
    position: absolute;
    left: px(120);
    top: px(30);
  }

  .down {
    position: absolute;
    left: px(60);
    top: px(60);
  }

  .up {
    position: absolute;
    left: px(60);
    top: px(0);
  }

  .restore {
    position: absolute;
    left: px(60);
    top: px(30);
  }

  .special {
    position: absolute;

    left: 0;
    top: px(100);
  }

  .desc {
    position: absolute;

    left: 0;
    top: px(130);
  }
}
</style>
