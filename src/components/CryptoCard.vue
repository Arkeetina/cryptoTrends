<template>
  <div class="crypto-card-container">

    <div class="name-container">
      <h2>{{ name }}</h2>
      <span>{{ abbr }}</span>
    </div>

    <div class="icon-container">
      <span>{{ rank }}</span>
      <img class="icon-coin" src="" />
    </div>

    <div class="price-info-container">
      <div class="chart"></div>
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
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'CryptoCard',
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>