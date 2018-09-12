<template>
  <div>
    <div class="change">
      <p class="sub-title">Change 24h</p>
      <p
        v-if="showPriceLoader"
        class="info-title"
      >
        Loading
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
        Loading
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
        Loading 
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
    font-size: 18px;
    font-weight: 500;
  }

  .green {
    color: green;
  }

  .red {
    color: red;
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
        change24: ''
      },
      showPriceLoader: false,
    }
  },

  computed: {
    change24Class: {
      get() {
        if (this.coinPriceData.change24.indexOf('-') !== -1) return 'red'
        if (this.coinPriceData.change24.indexOf('-') === -1) return 'green'
        return ''
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
        this.showPriceLoader = false
        console.log(e)
      }
    },
  },
}
</script>

