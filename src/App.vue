<template>
  <div id="app">
    <div
      v-if="isCryptoInfoLoading"
      class="loader-container"
    >
      <img src="./assets/loader.svg">
    </div>
    <Header
      v-if="!isCryptoInfoLoading"
      @flipallcoins="flipAllCoins"
    />
    <div
      v-if="!isCryptoInfoLoading"
      class="coins-list-section"
    >
      <CryptoCard
        v-for="cryptoCoin in cryptocomparedatalist"
        :updatecard="updatecard"
        :key="cryptoCoin.coinid"
        :logosrc="cryptoCoin.imgurl"
        :showbackside="cryptoCoin.showbackside"
        :coinid="cryptoCoin.coinid"
        :symbol="cryptoCoin.symbol"
        :coinname="cryptoCoin.name"
        cardcolor="blue-card"
      />
    </div>
    <div
      v-if="!isCryptoInfoLoading"
      class="load-more-button-container"
    >
      <div v-if="showButtonLoader">
        Loading
      </div>
      <div
        v-if="!showButtonLoader"
        class="load-more"
        @click="loadMoreCoins()"
      >
        Load next 10 coins
      </div>
    </div>
    <Footer v-if="!isCryptoInfoLoading" />

  </div>
</template>

<style lang="scss">
body {
  margin: 0
}

.load-more {
  border: 0;
  font-weight: 300;
  font-size: 18px;
}

.load-more:hover {
  cursor: pointer;
}

.load-more-button-container {
  text-align: center;
}

.loader-container {
  display: flex;
  margin-top: 150px;
  justify-content: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.coins-list-section {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
}

@media  (max-width: 650px) {
  .coins-list-section {
    grid-template-columns: 1fr;
  }
}

.blue-card {
  border: 1px dashed lightblue;
}
</style>

<script>
import CryptoCard from './components/CryptoCard.vue'
import Header from './components/Header'
import Footer from './components/Footer'
import api from './api/api'

const cryptoComparaBaseUrl = 'https://cryptocompare.com'

export default {
  name: 'App',
  components: {
    CryptoCard,
    Header,
    Footer,
  },
  data() {
    return {
      isCryptoInfoLoading: true,
      showButtonLoader: false,
      cryptocomparedatalist: [],
      pageNumb: 0,
      updatecard: false,
    }
  },
  created() {
    this.loadCryptoData()
  },
  methods: {
    async flipAllCoins() {
      this.cryptocomparedatalist = this.cryptocomparedatalist.map(coin => {
          const coinObj = {
            ...coin,
            showbackside: true,
          }
          return coinObj
      });
      this.updatecard = true;
      await this.$nextTick()
      this.updatecard = false;
      this.cryptocomparedatalist = this.cryptocomparedatalist.map(coin => {
          const coinObj = {
            ...coin,
            showbackside: false,
          }
          return coinObj
      });
    },

    async loadMoreCoins() {
      this.pageNumb = this.pageNumb + 1
      this.showButtonLoader = true;
      await this.loadCryptoData()
      this.showButtonLoader = false;
    },

    async loadCryptoData() {
      try {
        // this.isCryptoInfoLoading = true
        const options = { method: 'GET' }
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD&page=${this.pageNumb}`
        const coinlist = await api.startFetchJsonData(cryptoCompareUrl, options, 3)
        
        const newData= coinlist.Data.map(coin => {
          const coinObj = {
            coinid: coin.CoinInfo.Id,
            symbol: coin.CoinInfo.Name,
            name: coin.CoinInfo.FullName,
            imgurl: `${cryptoComparaBaseUrl}${coin.CoinInfo.ImageUrl}`,
            showbackside: false,
          }
          return coinObj
        })
        if (this.cryptocomparedatalist.length) {
          this.cryptocomparedatalist = [...this.cryptocomparedatalist, ...newData]
        } else {
          this.cryptocomparedatalist = newData
        }

        
        this.isCryptoInfoLoading = false;
      } catch(e) {
        this.isCryptoInfoLoading = false;
        console.log(e)
      }
    }
  }
}
</script>
