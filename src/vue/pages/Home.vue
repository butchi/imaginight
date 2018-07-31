<template lang="pug">
.home
  .wrapper
    header
      h1.title(data-heading-level='1')
        | Imaginight
    main
      .container
        stage
</template>

<script>
import stage from '@/vue/components/module/stage.vue';

export default {
  name: "home",
  components: {
    stage,
  },
  data() {
    return {
      msg: 'hello world!'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "common";

.title {
  margin: 0 px(10);

  font-family: $cursive;
  font-size: px(30);
}
</style>
