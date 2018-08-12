<template>
  <div class="crypto-card-container">

    <div class="name-container">
      <h2>{{ name }}</h2>
      <span>{{ abbr }}</span>
    </div>

    <div class="icon-container">
      <span>{{ rank }}</span>
      <img
        class="icon-coin"
        width= "240px"
        height="320px"
        src=""
      >
    </div>

    <div class="price-info-container">
      <div class="chart">I am not empty</div>
      <div class="rate-information">
        <div class="rate">
          <p class="sub-title">Rate</p>
          <p class="info-title"> {{ rate }} </p>
        </div>
        <div class="marketcap">
          <p class="sub-title">Market Cap</p>
          <p class="info-title"> {{ marketcap }} </p>
        </div>
      </div>
    </div>

    <div class="about-coin-containet">
      <p> {{ aboutCoin }} </p>
    </div>

    <div class="headlines-container">
      <p class="sub-title">Latest headlines...</p>

      <div class="headlines">
        <NewsFeed
          :cryptocur="cryptocur"
        />
      </div>

    </div>

  </div>
</template>

<script>

import api from '../api/api'
import NewsFeed from './NewsFeed'

export default {
  name: 'CryptoCard',
  components: {
    NewsFeed
  },
  props: {
    cryptocur: { type: String, required: true },
  },
  data() {
    return {
      name: '',
      abbr: '',
      rank: '',
      marketcap: '',
      aboutCoin: '',
      rate: '',
    }
  }
}
</script>

<style lang="scss">
.crypto-card-container {
  border: solid 1px #000;
  border-radius: 3px;
}
</style>