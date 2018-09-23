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
  </div>
</template>

<style scoped lang="scss">

@import "../assets/settings.scss";


</style>

<script>

export default {
  name: 'LoadButton',
  props: {
    showbuttonloader: { type: Boolean, required: true },
    singleitem: { type: Boolean, required: true },
    showloader: { type: Boolean, required: true },
    showinitloader: { type: Boolean, required: true },
  },
  computed: {
  },
  created() {
  },
  methods: {
    loadMoreCoins() {
      this.$emit('loadmorecoins');
    }
  },
}
</script>