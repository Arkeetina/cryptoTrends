<template>
  <div id="app">
    <div v-if="!isCryptoInfoFetched">
      I am loading
    </div>
    <div
      v-if="isCryptoInfoFetched"
      class="coins-list-section"
    >
      <CryptoCard
        :cryptosdatalist="cryptosdatalist"
        coinid="1"
        cryptocur="bitcoin"
        cardcolor="yellow-card"
      />
      <CryptoCard
        :cryptosdatalist="cryptosdatalist"
        coinid="1027"
        cryptocur="ethereum"
        cardcolor="green-card"
      />
      <CryptoCard
        :cryptosdatalist="cryptosdatalist"
        coinid="52"
        cardcolor="blue-card"
        cryptocur="XRP"
      />
      <CryptoCard
        :cryptosdatalist="cryptosdatalist"
        coinid="1831"
        cardcolor="pink-card"
        cryptocur="Bitcoin Cash"
      />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.coins-list-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@media  (max-width: 650px) {
  .coins-list-section {
    grid-template-columns: 1fr;
  }
}

.pink-card {
  background-color: lightpink;
}
.blue-card {
  background-color: lightblue;
}
.green-card {
  background-color: lightgreen;
}

.yellow-card {
  background-color: lightyellow;
}
</style>

<script>
import CryptoCard from './components/CryptoCard.vue'
import api from './api/api'

export default {
  name: 'App',
  components: {
    CryptoCard
  },
  data() {
    return {
      isCryptoInfoFetched: false,
      cryptosdatalist: {},
    }
  },
  created() {
    this.loadCryptoData()
  },
  methods: {
    async loadCryptoData() {
      try {
        const options = {
          method: 'GET',
          sort: 'id'
        };
        const url = 'https://api.coinmarketcap.com/v2/ticker/';
        const cryptosDataList = await api.startFetchJsonData(url, options, 3);
        this.cryptosdatalist = { ...cryptosDataList.data };
        this.isCryptoInfoFetched = !this.isCryptoInfoFetched;
      } catch(e) {
        console.log(e)
      }
    }
  }
}
</script>
