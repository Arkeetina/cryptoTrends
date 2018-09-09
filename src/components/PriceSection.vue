<template>
  <div>
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

<style lang="scss">
  .sub-title {
    margin: 0;
  }

  .info-title {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
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
      },
      showPriceLoader: false,
    }
  },

  created() {
    this.fetchCoinInformation()
  },

  methods: {
    async fetchCoinInformation() {
      try {
        const options = { method: 'GET' };
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.symbol}&tsyms=USD`
        const priceData = await api.startFetchJsonData(url, options, 3)

        this.coinPriceData = {
          ...this.coinPriceData,
          marketcap: priceData.DISPLAY[this.symbol].USD.MKTCAP,
          price: priceData.DISPLAY[this.symbol].USD.PRICE,
        }

      } catch(e) {
        console.log(e)
      }
    },
  },
}
</script>

