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
      <img
        :src="logSrc"
        width="115px"
        height="115px"
      >
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

    <div class="about-coin-container">
      <p v-if="!aboutCoin"> Loading </p>
      <p v-if="aboutCoin"> {{ aboutCoin }} </p>
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
@media  (max-width:650px) {
  .crypto-card-container {
    min-width: 100%;
  }
}
.crypto-card-container {
  height: 580px;
  min-width: 274px;;
  overflow-y: visible;
  padding: 30px;
}

.about-coin-container {
  font-size: 14px;
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
  data() {
    return {
      aboutCoin: '',
    }
  },
  computed: {
    logSrc() {
      return `https://s2.coinmarketcap.com/static/img/coins/128x128/${this.coinid}.png`
    },
    coinData() {
      const data = { ...this.cryptosdatalist[this.coinid] }
      if (this.cryptosdatalist[this.coinid].name === "XRP") data.name = "Ripple"
      return data
    },
    cardClass() {
      return `crypto-card-container ${this.cardcolor}`
    },
  },
  created() {
    this.fetchWikiExtract()
  },
  methods: {
    setURI() {
      if (this.cryptocur === "XRP") return encodeURIComponent('Ripple (payment protocol)')
      return encodeURIComponent(this.cryptocur)
    },
    async fetchWikiExtract() {
      try {
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exsentences=10&titles=${this.setURI()}&origin=*`
        const options = { method: 'GET' }
        const articleExtract = await api.startFetchJsonData(url, options, 3)
        const keyId = Object.keys(articleExtract.query.pages)[0]
        const extractString = articleExtract.query.pages[keyId].extract.replace(/<(.|\n)*?>/g, '')
        this.aboutCoin = `${extractString.split('.').slice(0, 3).join('. ')}.`
      } catch(e) {
        console.log(e)
      }
    },
  },
}
</script>

