<template>
  <div>
    <CryptoCard />
  </div>
</template>

<script>
import CryptoCard from './CryptoCard.vue'

export default {
  name: 'Main',
  components: {
    CryptoCard,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>