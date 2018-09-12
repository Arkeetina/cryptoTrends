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
          {{ coinname.toUpperCase() }}
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
          <div class="name-section">
            <div class="name-container">
              <span class="crypto-title">{{ coinname.toUpperCase() }} ({{ symbol }}) </span>
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
              <PriceSection :symbol="symbol" />
            </div>
          </div>
          <p
            class="sub-title"
            style="font-size: 18px;margin: 15px 0 5px 0;"
          >
            Latest headlines...
          </p>
        </div>

        <div class="headlines-container">
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
.top-section {
  background: #fff;
  padding: 20px 20px 0 20px;
}

.card-main-section {
  border: 1px solid #413e7e;
  box-shadow: 1px 1px 1px #0000003b;
  background-color: #fff;
  border-radius: 5px;
  width: 100%;
}
@media  (max-width:650px) {
  .crypto-card-container {
    min-width: 100%;
  }
}
.crypto-card-container {
  min-height: 435px;
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
  width: 100%;
  background-color: #fff;
  border: 1px solid #413e7e;
  box-shadow: 1px 1px 1px #0000003b;
  border-radius: 5px;
}
.backside-icon-container:hover {
  cursor: pointer;
}

.about-coin-container {
  font-size: 14px;
  min-height: 150px;
}

.crypto-title {
  font-weight: 300;
  font-size: 24px;
  color: #413e7e;
}

.name-section {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.price-info-container {
  display: flex;
  flex-wrap: nowrap;
}

.headlines-container {
  background-color: #f2f2f2;
  z-index: 1000;
}
.headlines {
  border-top: 1px solid #bdbdbd;
}
</style>

<script>
import NewsFeed from './NewsFeed'
import PriceSection from './PriceSection'


export default {
  name: 'CryptoCard',
  components: {
    NewsFeed,
    PriceSection
  },
  props: {
    coinname: { type: String, required: true },
    coinid: { type: String, required: true },
    logosrc: { type: String, required: true },
    symbol: { type: String, required: true },
    cardcolor: { type: String, required: true },
    showbackside: { type: Boolean, required: true },
  },
  data() {
    return {
      coinPriceData: {
        marketcap: '',
        price: '',
      },
      showPriceLoader: false,
      showBackside: false,
    }
  },
  computed: {
    cardClass() {
      if (this.showBackside) return `crypto-card-container justify-center ${this.cardcolor}`
      return `crypto-card-container justify-start ${this.cardcolor}`
    },
  },
  watch: {
    showbackside() {
      if(!this.showbackside) this.showBackside = false
      if(this.showbackside) this.showBackside = true
    }
  },
  methods: {
    flipCard() {
      this.showBackside = !this.showBackside
    },
  },
}
</script>

