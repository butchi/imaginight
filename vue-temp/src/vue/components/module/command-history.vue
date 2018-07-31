<template lang="pug">
.command-history
  .back(
    v-if="attackArr.length"
    v-on:click="handleBack"
  )
    i.fa.fa-undo(aria-hidden="true")
  .history(v-for="attack in attackArr")
    .attack
      .command
        | {{ attack.command.name }}: {{ attack.command.desc || attack.command.func.desc }}
        i.fa.fa-long-arrow-right(aria-hidden="true")
          | {{ attack.target.name }}
</template>

<script>
export default {
  name: 'command-history',
  props: {
    handleBack: Function,
    attackArr: Array,
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.command-history {
  position: absolute;

  left: px(400);
  top: px(680);

  .fa-undo {
    cursor: pointer;
  }
}
</style>
