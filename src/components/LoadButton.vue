<template>
  <div
    v-if="!showinitloader && !showloader && !singleitem"
    class="load-more-button-container"
  >
    <div
      v-if="showbuttonloader && !singleitem"
      class="load-more"
    >
      <span>Loading</span>
      <img
        style="margin-left: 5px;"
        src="../assets/loader-small.svg"
      >
    </div>

    <div
      v-if="!showbuttonloader && !singleitem"
      class="load-more"
      @click="loadMoreCoins()"
    >
      <p
        class="load-more-button"
      >
        Load more coins
      </p>
    </div>
    <div class="project-info">Built by <a href="http://www.katerina-bezlepkina.com/">Katerina Bezlepkina </a> with contributions from <a href="https://www.jankoprester.com">Janko Prester </a>. v0.1.0</div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/settings.scss";
</style>

<script>
export default {
  name: "LoadButton",
  props: {
    showbuttonloader: { type: Boolean, required: true },
    singleitem: { type: Boolean, required: true },
    showloader: { type: Boolean, required: true },
    showinitloader: { type: Boolean, required: true }
  },
  computed: {},
  created() {},
  methods: {
    loadMoreCoins() {
      this.$emit("loadmorecoins");
    }
  }
};
</script>