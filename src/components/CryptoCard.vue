<template>
  <div :class="cardClass">

    <div class="top-section">
      <div class="name-container">
        <span class="crypto-title">{{ coinData.name }}</span>
        <span style="margin-left: 5px">({{ coinData.symbol }})</span>
      </div>

      <div class="icon-container">
        <p>Rank: #{{ coinData.rank }}</p>
      </div>
    </div>

    <div class="price-info-container">
      <div class="crypto-chart">Not empty</div>
      <div
        class="rate-information"
        style="margin-left: 15px; padding: 12px 0;"
      >
        <div class="rate">
          <p class="sub-title">Rate</p>
          <p class="info-title"> {{ coinData.quotes.USD.price }} </p>
        </div>
        <div class="marketcap">
          <p class="sub-title">Market Cap</p>
          <p class="info-title"> {{ coinData.quotes.USD.market_cap }} </p>
        </div>
      </div>
    </div>

    <div class="about-coin-containet">
      <p> {{ coinData.aboutCoin }} </p>
    </div>

    <div class="headlines-container">
      <p
        class="sub-title"
        style="font-size: 18px;"
      >
        Latest headlines...
      </p>

      <div class="headlines">
        <NewsFeed
          :cryptocur="coinData.name"
        />
      </div>

    </div>

  </div>
</template>

<style lang="scss">
.crypto-card-container {
  height: 470px;
  overflow-y: visible;
  padding: 30px;
}
.crypto-title {
  font-weight: 500;
  font-size: 24px;
}

.crypto-chart {
  width: 220px;
  height: 120px;
  background-color: grey;
}
.top-section {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.price-info-container {
  display: flex;
  flex-wrap: nowrap;
}

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

import api from '../api/api'
import NewsFeed from './NewsFeed'

const COINMARKETCAP_ROOT_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10';


export default {
  name: 'CryptoCard',
  components: {
    NewsFeed
  },
  props: {
    cryptosdatalist: { type: Object, required: true },
    cryptocur: { type: String, required: true },
    coinid: { type: String, required: true },
    cardcolor: { type: String, required: true },
  },
  computed: {
    coinData() {
      const data = { ...this.cryptosdatalist[this.coinid] }
      return data
    },
    cardClass() {
      return `crypto-card-container ${this.cardcolor}`
    },
  },
  created() {
  },
  created() {
  },
  methods: {
  },
}
</script>

