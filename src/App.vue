<template>
  <div id="app">

    <div
      v-if="showInitLoader && !showLoader"
      class="loader-container"
    >
      <img src="./assets/loader.svg">
    </div>


    <Header
      v-if="!showInitLoader"
      :namelist="coinsNameList"
      @filterselectedcoin="filterSelectedCoin"
      @flipallcoins="flipAllCoins"
    />


    <div
      v-if="!showInitLoader && !showLoader"
      :class="containerClass"
    >
      <CryptoCard
        v-for="cryptoCoin in cryptocomparedatalist"
        :heightclass="heightClass"
        :key="cryptoCoin.coinid"
        :logosrc="cryptoCoin.imgurl"
        :showbackside="cryptoCoin.showbackside"
        :coinid="cryptoCoin.coinid"
        :symbol="cryptoCoin.symbol"
        :coinname="cryptoCoin.name"
        :cardcolor="cryptoCoin.cardcolor"
        :singleitem="singleItem"
        @closecoin="loadCryptoData"
      />
    </div>


    <div
      v-if="showLoader"
      class="loader-container"
    >
      <img src="./assets/loader.svg">
    </div>


    <div
      v-if="!showInitLoader && !showLoader && !singleItem"
      class="load-more-button-container"
    >
      <div
        v-if="showButtonLoader && !singleItem"
        class="load-more"
      >
        <span>Loading</span>
        <img
          style="margin-left: 5px;"
          src="./assets/loader-small.svg"
        >
      </div>
      <div
        v-if="!showButtonLoader && !singleItem"
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
  display: flex;
  font-size: 18px;
  justify-content: center;
}

.load-more-button {
  font-weight: 300;
  background-color: none;
  border: none;
  margin: 0;
}
.load-more:hover {
  cursor: pointer;
}

.load-more-button-container {
  background-color: #f8f8f8;
  padding: 15px 0;
  width: 100%;
}

.loader-container {
  display: flex;
  background-color: #413e7e;
  height: 100vh;
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

.coins-list-section-single-item {
  margin-top: 80px;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr;
}

.dark-purple {
  background-color: #413e7e;
}

.light-purple {
  background-color: #726cda;
}

.card-height {
  height: 90vh;
}

@media  (max-width: 750px) {
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
      showInitLoader: true,
      showLoader: false,
      coinsNameList: [],
      showButtonLoader: false,
      cryptocomparedatalist: [],
      pageNumb: 0,
    }
  },
  computed: {
    heightClass() {
      if(this.cryptocomparedatalist.length === 1) return "card-height"
      return ""
    },
    containerClass() {
      if(this.cryptocomparedatalist.length === 1) return "coins-list-section-single-item"
      return "coins-list-section"
    },
    singleItem() {
      return this.cryptocomparedatalist.length === 1
    }
  },
  created() {
    this.loadCryptoData()
    this.loadCoinNames()
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

    filterSelectedCoin(coin) {
      const coinItemSelected = this.cryptocomparedatalist.filter(coinItem => coinItem.symbol === coin)
      if (!coinItemSelected.length) {
        this.showLoader = true;
        this.loadCoinData(coin)
      } else {
        this.cryptocomparedatalist = coinItemSelected
      }
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

    async loadCoinNames() {
      try {
        const coinMarketCapUrl = 'https://api.coinmarketcap.com/v2/listings/'
        const options = { method: 'GET' }
        const coinNameList = await api.startFetchJsonData(coinMarketCapUrl, options, 3)

        const list = coinNameList.data.map(coin => ({ name: coin.name, symbol: coin.symbol }) );
        this.coinsNameList = list;
      } catch(e) {
        console.log(e)
        this.coinsNameList = [];
      }
      
    },

    async loadCoinData(coinSymbol) {
      try {
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${coinSymbol}&tsym=USD`
        const options = { method: 'GET' }
        const coinInformation = await api.startFetchJsonData(cryptoCompareUrl, options, 3)
        const coinData = [{
          coinid: coinInformation.Data.CoinInfo.Id,
          symbol: coinInformation.Data.CoinInfo.Name,
          name: coinInformation.Data.CoinInfo.FullName,
          imgurl: `${cryptoComparaBaseUrl}${coinInformation.Data.CoinInfo.ImageUrl}`,
          showbackside: false,
          cardcolor: this.setCardBackgroundColor(1),
        }]

        this.cryptocomparedatalist = coinData;
        
        this.showLoader = false
      } catch(e) {
        this.showLoader = false
        console.log(e)
      }
    },

    async loadCryptoData(refetchOnClose=false) {
      try {
        if (refetchOnClose) this.showLoader = true
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD&page=${this.pageNumb}`
        const options = { method: 'GET' }
        const coinInformationList = await api.startFetchJsonData(cryptoCompareUrl, options, 3)
        
        const newData= coinInformationList.Data.map((coin, index) => {
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

        if (this.cryptocomparedatalist.length && !refetchOnClose) {
          this.cryptocomparedatalist = [...this.cryptocomparedatalist, ...newData]
        } else {
          this.cryptocomparedatalist = newData
        }

        
        if (refetchOnClose) this.showLoader = false
        if (!refetchOnClose) this.showInitLoader = false
      } catch(e) {
        if (refetchOnClose) this.showLoader = false
        if(!refetchOnClose) this.showInitLoader = false
        console.log(e)
      }
    }
  }
}
</script>
