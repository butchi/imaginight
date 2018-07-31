<template lang="pug">
.command-index
  .command(v-for="chara in characterLi")
    .job
      | {{ chara.job }}
    .desc
      | {{ chara.special.name }}: {{ chara.special.desc || chara.special.func.desc}}</div>
</template>

<script>
import { characterLi } from '@/js/lib/character-list';

export default {
  name: 'command-index',
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
    characterLi() {
      return characterLi;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "common";

.command-index {
  position: absolute;

  left: px(650);
  top: px(0);

  width: px(200);

  .command {
    + .command {
      margin-top: px(7);
    }
  }

  .job {
    font-weight: bold;
    font-size: px(11);
  }

  .desc {
    font-size: px(7);
  }
}
</style>
