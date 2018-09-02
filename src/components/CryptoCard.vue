<template>
  <div :class="cardClass">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated flipInY"
    >
      <div
        v-if="showBackside"
        class="backside-icon-container"
        @click="flipCard()"
      >
        <img
          :src="logosrc"
          width="128px"
          height="128px"
        >
        <p
          class="crypto-title"
          style="padding: 0 25px;"
        >
          {{ coinname }}
        </p>
      </div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated flipInY"
    >
      <div
        v-if="!showBackside"
        class="card-main-section"
      >
        <div class="top-section">
          <div class="name-container">
            <span class="crypto-title">{{ coinname }}</span>
            <span style="margin-left: 5px">({{ symbol }})</span>
          </div>
        </div>

        <div class="price-info-container">
          <img
            :src="logosrc"
            width="115px"
            height="115px"
            class="crypto-logo"
            @click="flipCard()"
          >
          <div
            class="rate-information"
            style="margin-left: 15px; padding: 12px 0;"
          >

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
            <!-- <div class="marketcap">
              <p class="sub-title">Website</p>
              <p class="info-title">
                <a :href="coinDescription.websiteUrl">{{ coinname }}</a>
              </p>
            </div> -->

          </div>
        </div>

        <!-- <div class="about-coin-container">
          <p v-if="!coinDescription.description"> Loading </p>
          <p v-if="coinDescription.description"> {{ coinDescription.description }} </p>
        </div> -->

        <div class="headlines-container">
          <p
            class="sub-title"
            style="font-size: 18px;"
          >
            Latest headlines...
          </p>

          <div class="headlines">
            <NewsFeed
              :cryptocur="coinname"
            />
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.crypto-logo:hover {
  cursor: pointer;
}

@media  (max-width:650px) {
  .crypto-card-container {
    min-width: 100%;
  }
}
.crypto-card-container {
  min-height: 450px;
  min-width: 274px;;
  overflow-y: visible;
  padding: 30px;
  display: flex;
  background-color: #fff;
}

.justify-center {
  justify-content: center
}

.justify-start {
  justify-content: flex-start;
}

.backside-icon-container {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
}
.backside-icon-container:hover {
  cursor: pointer;
}

.about-coin-container {
  font-size: 14px;
  min-height: 150px;
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

.headlines {
  margin-bottom: 10px;
}
</style>

<script>

import cryptocompare from 'cryptocompare'
import axios from 'axios'
import api from '../api/api'
import NewsFeed from './NewsFeed'


export default {
  name: 'CryptoCard',
  components: {
    NewsFeed
  },
  props: {
    coinname: { type: String, required: true },
    coinid: { type: String, required: true },
    logosrc: { type: String, required: true },
    symbol: { type: String, required: true },
    cardcolor: { type: String, required: true },
    showbackside: { type: Boolean, required: true },
    updatecard: { type: Boolean, required: true },
  },
  data() {
    return {
      // coinDescription: {
      //   description: '',
      //   websiteUrl: '',
      // },
      coinPriceData: {
        marketcap: '',
        price: '',
      },
      showPriceLoader: false,
    }
  },
  computed: {
    cardClass() {
      if (this.showBackside) return `crypto-card-container justify-center ${this.cardcolor}`
      return `crypto-card-container justify-start ${this.cardcolor}`
    },
    showBackside() {
      return this.showbackside;
    }
  },
  watch: { 
    updatecard: function(newVal, oldVal) { // watch it
      if (newVal === true) {
        this.showPriceLoader = true
        this.fetchCoinInformation()
      } else {
        this.showPriceLoader = false
      }
    }
  },
  created() {
    this.fetchCoinInformation()
    debugger
  },

  // async beforeUpdate() {
  //   if (this.updatecard === true) {
  //     // this.showPriceLoader = true
  //     this.fetchCoinInformation()
  //     // this.showPriceLoader = false
  //   }

  // },
  methods: {
    flipCard() {
      this.showBackside = !this.showBackside
      if (this.showBackside === false) this.fetchCoinInformation()
    },
    async fetchCoinInformation() {
      try {
        // const urlDescription = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${this.coinid}`
        const options = { method: 'GET' };
        // const snapshot = await axios.get(urlDescription)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.symbol}&tsyms=USD`
        const priceData = await api.startFetchJsonData(url, options, 3)

        // this.coinDescription = {
        //   ...this.coinDescription,
        //   description: snapshot.Data.General.Description,
        //   websiteUrl: snapshot.Data.General.WebsiteUrl,
        // }

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

