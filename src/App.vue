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
        :key="cryptoCoin.coinid"
        :logosrc="cryptoCoin.imgurl"
        :showbackside="cryptoCoin.showbackside"
        :coinid="cryptoCoin.coinid"
        :symbol="cryptoCoin.symbol"
        :coinname="cryptoCoin.name"
        :cardcolor="cryptoCoin.cardcolor"
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
        <p
          class="load-more-button"
        >
          Load next 10 coins
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0
}

.load-more {
  border: 0;
  cursor: pointer;
  box-shadow: 1px #000;
}

.load-more-button {
  font-weight: 300;
  font-size: 18px;
  background-color: none;
  border: none;
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
  margin-top: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.dark-purple {
  background-color: #413e7e;
}

.light-purple {
  background-color: #726cda;
}

@media  (max-width: 650px) {
  .coins-list-section {
    grid-template-columns: 1fr;
  }
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

      await this.$nextTick()
      this.cryptocomparedatalist = this.cryptocomparedatalist.map(coin => {
          const coinObj = {
            ...coin,
            showbackside: false,
          }
          return coinObj
      });
    },

    setCardBackgroundColor(index) {
      if (((index / 3) + index) % 2 === 0) {
        return "dark-purple"
      } 
      return "light-purple"
    },

    async loadMoreCoins() {
      this.pageNumb = this.pageNumb + 1
      this.showButtonLoader = true
      await this.loadCryptoData()
      this.showButtonLoader = false
    },

    async loadCryptoData() {
      try {
        const options = { method: 'GET' }
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD&page=${this.pageNumb}`
        const coinlist = await api.startFetchJsonData(cryptoCompareUrl, options, 3)
        
        const newData= coinlist.Data.map((coin, index) => {
          const coinObj = {
            coinid: coin.CoinInfo.Id,
            symbol: coin.CoinInfo.Name,
            name: coin.CoinInfo.FullName,
            imgurl: `${cryptoComparaBaseUrl}${coin.CoinInfo.ImageUrl}`,
            
            showbackside: false,
            cardcolor: this.setCardBackgroundColor(index),
          }
          return coinObj
        })
        if (this.cryptocomparedatalist.length) {
          this.cryptocomparedatalist = [...this.cryptocomparedatalist, ...newData]
        } else {
          this.cryptocomparedatalist = newData
        }

        
        this.isCryptoInfoLoading = false
      } catch(e) {
        this.isCryptoInfoLoading = false
        console.log(e)
      }
    }
  }
}
</script>
