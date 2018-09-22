<template>
  <div :class="cardClass">
    <transition
      :duration="{ enter: 1000 }"
      name="custom-classes-transition"
      enter-active-class="animated flipInY"
    >
      <div
        v-if="showBackside"
        :class="'backside-icon-container ' + innerCardHeight"
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
      :duration="{ enter: 1000 }"
      name="custom-classes-transition"
      enter-active-class="animated flipInY"
    >
      <div
        v-if="!showBackside"
        :class="'card-main-section ' + innerCardHeight"
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
              class="crypto-logo"
              @click="flipCard()"
            >
            <div
              class="rate-information"
            >
              <PriceSection :symbol="symbol" />
            </div>
          </div>
          <p
            class="sub-title"
            style="font-size: 18px;margin: 15px 0 10px 0;"
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
.crypto-logo {
  height: 115px;
  width: 115px;
}
.top-section {
  background: #fff;
  height: 261px;
  padding: 30px 30px 0 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.cross-button {
  font-size: 18px;
  color: white;
  font-weight: 500;
}

.cross-button:hover {
  cursor: pointer;
}

.card-main-section {
  border: 1px solid #413e7e;
  box-shadow: 1px 1px 1px #0000003b;
  background-color: #fff;
  border-radius: 5px;
  width: 380px;
}

.rate-information {
  margin-left: 40px;
  padding: 12px 0;
}

.crypto-card-container {
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
  width: 380px;
  min-height: 562px;
  background-color: #fff;
  border: 1px solid #413e7e;
  box-shadow: 1px 1px 1px #0000003b;
  border-radius: 2px;
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
  align-items: center;
  flex-wrap: nowrap;
}

.headlines-container {
  background-color: #f2f2f2;
  z-index: 1000;
}
.headlines {
  border-top: 1px solid #bdbdbd;
}

.inner-card-height {
  min-height: 562px;
  margin-top: 40px;
}

@media  (max-width:480px) {
  .inner-card-height {
    margin-top: 20px;
  }

  .backside-icon-container {
    width: 355px;
  }

  .crypto-logo { 
    height: 90px;
    width: 90px;
  }

  .rate-information {
    margin-left: 20px;
    font-size: 13px;
  }

  .card-main-section  {
    width: 355px;
    height: 550px;
  }
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
    singleitem: { type: Boolean, required: true },
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
      return `crypto-card-container justify-center ${this.cardcolor}`
    },
    innerCardHeight() {
      return 'inner-card-height'
    }
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
    // onCloseClick() {
    //   this.$emit('closecoin', true);
    // }
  },
}
</script>

