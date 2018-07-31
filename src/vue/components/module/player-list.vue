<template lang="pug">
.player-list
  div(v-for="player in playerArr")
    player(
      v-bind:player="player",
      v-bind:data-party="player.party"
      v-bind:handleSelect="handleSelect"
    )
</template>

<script>
import player from '@/vue/components/module/player.vue';

export default {
  name: 'player-list',
  components: {
    player,
  },
  props: {
    playerArr: Array,
    handleSelect: Function,
  },
  data() {
    return {
    };
  },
  computed: {
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.player-list {
  position: absolute;

  left: 0;
  top: px(0);

  // MAGIC NUMBER: 4つに区切る
  width: px(1000);
}
</style>
