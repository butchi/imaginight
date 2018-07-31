<template lang="pug">
.command-history
  .back(
    v-if="attackArr.length"
    v-on:click="back"
  )
    i.fa.fa-undo(aria-hidden="true")
  .history(v-for="attack in attackArr")
    .attack
      .command
        | {{ attack.command.name }}: {{ attack.command.desc || attack.command.func.desc }}
        i.fa.fa-long-arrow-right(aria-hidden="true")
          | {{ attack.target.name }}
  button(
    v-if="isReady"
    v-on:click="attack"
  )
    | 実行
</template>

<script>
export default {
  name: 'command-history',
  props: {
    back: Function,
    attackArr: Array,
    isReady: Boolean,
    attack: Function,
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.command-history {
  position: absolute;

  left: px(300);
  top: px(520);

  width: px(300);

  font-size: px(10);

  .fa-undo {
    cursor: pointer;
  }
}
</style>
