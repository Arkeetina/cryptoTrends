<template>
  <div id="app">

    <div
      v-if="showInitLoader && !showLoader"
      class="loader-container"
    >
      <img src="./assets/loader.svg">
    </div>


    <Header
      v-if="!showInitLoader"
      :namelist="coinsNameList"
      :itemslength="cryptocomparedatalist.length"
      @filterselectedcoin="filterSelectedCoin"
      @reloadcoins="loadCryptoData"
    />


    <div
      v-if="!showInitLoader && !showLoader"
      :class="containerClass"
    >
      <CryptoCard
        v-for="cryptoCoin in cryptocomparedatalist"
        :key="cryptoCoin.coinid"
        :logosrc="cryptoCoin.imgurl"
        :showbackside="cryptoCoin.showbackside"
        :coinid="cryptoCoin.coinid"
        :symbol="cryptoCoin.symbol"
        :coinname="cryptoCoin.name"
        :cardcolor="cryptoCoin.cardcolor"
        :singleitem="singleItem"
      />
    </div>

    <div
      v-if="showLoader"
      class="loader-container"
    >
      <img src="./assets/loader.svg">
    </div>

    <div
      v-if="singleItem"
      style="color: #fff"
      class="load-more"
      @click="loadCryptoData"
    >
      <i class="fas fa-arrow-left back-arrow" />
      <span class="loadmore-back-label">Back to full list</span>
    </div>

    <LoadButton
      :showbuttonloader="showButtonLoader"
      :singleitem="singleItem"
      :showloader="showLoader"
      :showinitloader="showInitLoader"
      @loadmorecoins="loadMoreCoins()"
    />
  </div>
</template>

<style lang="scss">
@import "./assets/settings.scss";

body {
  margin: 0;
}

.load-more-button {
  font-weight: 300;
  background-color: transparent;
  border: none;
  margin: 0;
}
.load-more:hover {
  cursor: pointer;
}

.load-more-button-container {
  background-color: $off-white;
  padding: 15px 0;
  bottom: 0;
  position: relative;
}

.load-more {
  border: 0;
  cursor: pointer;
  font-weight: 300;
  display: flex;
  font-size: 18px;
  justify-content: center;
}

.load-more:hover {
  opacity: 0.4;
}

.loader-container {
  display: flex;
  background-color: $dark-purple;
  height: 100vh;
  justify-content: center;
}

.loadmore-back-label {
  position: relative;
  bottom: 3px;
  left: 7px;
}

.project-info {
  color: #ffffff;
  font-size: 8px;
  right: 20px;
  bottom: 58px;
  position: absolute;
}

.project-info a {
  color: #ffffff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  background-color: $light-purple;
}

.coins-list-section {
  margin-top: 80px;
  // margin-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.coins-list-section-single-item {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
}

.dark-purple {
  background-color: $dark-purple;
}

.light-purple {
  background-color: $light-purple;
}

@media (max-width: 960px) {
  .coins-list-section {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .coins-list-section {
    margin-top: 120px;
  }

  .coins-list-section-single-item {
    margin-top: 120px;
  }
}
</style>

<script>
import CryptoCard from "./components/CryptoCard.vue";
import Header from "./components/Header";
import LoadButton from "./components/LoadButton";
import api from "./api/api";

const cryptoComparaBaseUrl = "https://cryptocompare.com";

export default {
  name: "App",
  components: {
    CryptoCard,
    Header,
    LoadButton
  },
  data() {
    return {
      showInitLoader: true,
      showLoader: false,
      coinsNameList: [],
      showButtonLoader: false,
      cryptocomparedatalist: [],
      pageNumb: 0
    };
  },
  computed: {
    containerClass() {
      if (this.cryptocomparedatalist.length === 1)
        return "coins-list-section-single-item";
      return "coins-list-section";
    },
    singleItem() {
      return this.cryptocomparedatalist.length === 1;
    }
  },
  created() {
    this.loadCryptoData();
    this.loadCoinNames();
  },
  methods: {
    filterSelectedCoin(coin) {
      const coinItemSelected = this.cryptocomparedatalist.filter(
        coinItem => coinItem.symbol === coin
      );
      if (!coinItemSelected.length) {
        this.showLoader = true;
        this.loadCoinData(coin);
      } else {
        this.cryptocomparedatalist = coinItemSelected;
      }
    },

    setCardBackgroundColor(index) {
      let currIndex = index + this.pageNumb * 10;

      if ((currIndex + 1) % 4 === 0 || currIndex % 4 === 0) {
        return "dark-purple";
      }
      return "light-purple";
    },

    async loadMoreCoins() {
      this.pageNumb = this.pageNumb + 1;
      this.showButtonLoader = true;
      await this.loadCryptoData();
      this.showButtonLoader = false;
    },

    async loadCoinNames() {
      try {
        const cryptoCompareUrl =
          "https://min-api.cryptocompare.com/data/all/coinlist";
        const options = { method: "GET" };
        const coinNameList = await api.startFetchJsonData(
          cryptoCompareUrl,
          options,
          3
        );

        const list = Object.keys(coinNameList.Data).map(coin => {
          return {
            name: coinNameList.Data[coin].CoinName,
            symbol: coinNameList.Data[coin].Symbol
          };
        });
        this.coinsNameList = list;
      } catch (e) {
        this.errorMessage =
          "Failed to load coin information, click reload to reload coin information";
        this.coinsNameList = [];
      }
    },

    async loadCoinData(coinSymbol) {
      try {
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=${coinSymbol}&tsym=USD`;
        const options = { method: "GET" };
        const coinInformation = await api.startFetchJsonData(
          cryptoCompareUrl,
          options,
          3
        );
        const coinData = [
          {
            coinid: coinInformation.Data.CoinInfo.Id,
            symbol: coinInformation.Data.CoinInfo.Name,
            name: coinInformation.Data.CoinInfo.FullName,
            imgurl: `${cryptoComparaBaseUrl}${
              coinInformation.Data.CoinInfo.ImageUrl
            }`,
            showbackside: false,
            cardcolor: this.setCardBackgroundColor(1)
          }
        ];

        this.cryptocomparedatalist = coinData;

        this.showLoader = false;
      } catch (e) {
        this.showLoader = false;
        this.errorMessage =
          "Failed to load coin information, click reload to reload coin information";
      }
    },

    async loadCryptoData(nonInitFetch = false) {
      try {
        if (nonInitFetch) {
          this.showLoader = true;
          this.cryptocomparedatalist = [];
        }
        const cryptoCompareUrl = `https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=USD&page=${
          this.pageNumb
        }`;
        const options = { method: "GET" };
        const coinInformationList = await api.startFetchJsonData(
          cryptoCompareUrl,
          options,
          3
        );

        const newData = coinInformationList.Data.map((coin, index) => {
          const coinObj = {
            coinid: coin.CoinInfo.Id,
            symbol: coin.CoinInfo.Name,
            name: coin.CoinInfo.FullName,
            imgurl: `${cryptoComparaBaseUrl}${coin.CoinInfo.ImageUrl}`,
            showbackside: false,
            cardcolor: this.setCardBackgroundColor(index)
          };
          return coinObj;
        });

        if (this.cryptocomparedatalist.length && !nonInitFetch) {
          this.cryptocomparedatalist = [
            ...this.cryptocomparedatalist,
            ...newData
          ];
        } else {
          this.cryptocomparedatalist = newData;
        }

        if (nonInitFetch) this.showLoader = false;
        if (!nonInitFetch) this.showInitLoader = false;
      } catch (e) {
        if (nonInitFetch) this.showLoader = false;
        if (!nonInitFetch) this.showInitLoader = false;
        this.errorMessage =
          "Failed to load coin information, click reload to reload coin information";
      }
    }
  }
};
</script>
