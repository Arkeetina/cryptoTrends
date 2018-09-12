<template>
  <div
    class="header-container"
    style="text-align: center"
  >
    <p class="header-title">CryptoTrends</p>
    <!-- <p style="margin:0">Search for crypto</p>
    <input
      v-model="searchInput"
    > -->
    <button
      class="button"
      @click="onFlipAllCoins"
    >
      Update coin information
    </button>

  </div>
</template>

<style scroped lang="scss">
  .header-title {
    font-size: 24px;
    font-weight: 500;
  }
  .button {
    background-color: #f8f8f8;
    border: none;
    
  }
  .button:hover {
    cursor: pointer;
  }
  .header-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    top: 0;
    background-color: #f8f8f8;
    color: #000;
    position: fixed;
    height: 80px;
    box-shadow: 1px 1px #000;
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

