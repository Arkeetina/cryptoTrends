<template>
  <div>
    <div class="change">
      <p class="sub-title">Change 24h</p>
      <p
        v-if="showPriceLoader"
        class="info-title"
      >
        <img
          src="../assets/loader-small.svg"
        >
      </p>
      <p
        v-if="!showPriceLoader"
        :class="change24Class + ' info-title'"
      > {{ coinPriceData.change24 }}
      </p>
    </div>
    <div class="rate">
      <p class="sub-title">Rate</p>
      <p
        v-if="showPriceLoader"
        class="info-title"
      >
        <img
          src="../assets/loader-small.svg"
        >
      </p>
      <p
        v-if="!showPriceLoader"
        class="info-title"
      > {{ coinPriceData.price }}
      </p>
    </div>
    <div class="marketcap">
      <p class="sub-title">Market Cap</p>
      <p
        v-if="showPriceLoader"
        class="info-title"
      >
        <img
          src="../assets/loader-small.svg"
        >
      </p>
      <p
        v-if="!showPriceLoader"
        class="info-title"
      >
        {{ coinPriceData.marketcap }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .sub-title {
    margin: 0;
  }

  .info-title {
    margin: 0;
    font-size: 17px;
    font-weight: 500;
  }

  .green {
    color: green;
  }

  .back {
    color: #000;
  }

  .red {
    color: red;
  }


  @media (max-width:480px) {
    .price-info-container {
      font-size: 15px;
    }
  }


</style>

<script>

import cryptocompare from 'cryptocompare'
import api from '../api/api'
import NewsFeed from './NewsFeed'
import PriceSection from './PriceSection'


export default {
  name: 'CryptoCard',
  components: {
    NewsFeed
  },
  props: {
    symbol: { type: String, required: true },
  },
  data() {
    return {
      coinPriceData: {
        marketcap: '',
        price: '',
        change24: '',
      },
      showPriceLoader: false,
    }
  },

  computed: {
    change24Class: {
      get() {
        if (this.coinPriceData.change24.indexOf('-') !== -1) return 'red'
        if (this.coinPriceData.change24.indexOf('-') === -1 && this.coinPriceData.change24) return 'green'
        return 'black'
      }
    }
  },

  created() {
    this.fetchCoinInformation()
  },

  methods: {

    async fetchCoinInformation() {
      try {
        this.showPriceLoader = true
        const options = { method: 'GET' };
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.symbol}&tsyms=USD`
        const priceData = await api.startFetchJsonData(url, options, 3)
        this.showPriceLoader = false

        this.coinPriceData = {
          ...this.coinPriceData,
          change24: priceData.DISPLAY[this.symbol].USD.CHANGE24HOUR,
          marketcap: priceData.DISPLAY[this.symbol].USD.MKTCAP,
          price: priceData.DISPLAY[this.symbol].USD.PRICE,
        }

      } catch(e) {
        this.coinPriceData.showPriceLoader = false
        this.coinPriceData.marketcap = 'Failed to load'
        this.coinPriceData.price = 'Failed to load'
        this.coinPriceData.change24 = 'Failed to load'
      }
    },
  },
}
</script>

