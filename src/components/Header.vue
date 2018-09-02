<template>
  <div
    class="header-container"
    style="text-align: center"
  >
    <p style="margin:0">Search for crypto</p>
    <input
      v-model="searchInput"
    >
    <button @click="onFlipAllCoins">Update coin information</button>

  </div>
</template>

<style lang="scss">
  .header-container {
    width: 100%;
    top: 0;
    background-color: #183d65;
    color: #fff;
    position: fixed;
    height: 50px;
  }
</style>

<script>

export default {
  name: 'Header',
  props: {
    // flipallcoins: { type: Function, required: true },
  },
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    onFlipAllCoins() {
      this.$emit('flipallcoins');
    },
  },
}
</script>

