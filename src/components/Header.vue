<template>
  <div
    class="header-container"
  >
    <div class="header-items">
      <div
        class="title-container"
        @click="reloadCoins"
      >
        <p
          class="header-title"
        >
          CryptoTrends
        </p>
        <span class="header-subtitle">beta</span>
      </div>
      <vue-autosuggest
        :suggestions="filteredOptions"
        :input-props="inputProps"
        :limit="10"
        @input="onInputChange"
        @selected="onSelected"
      >  
        <template slot-scope="{ suggestion }"><div class="item">{{ suggestion.item }}</div></template>
      </vue-autosuggest>
      
    </div>
  </div>
</template>

<style scroped lang="scss">
  @import "../assets/settings.scss";

  #autosuggest {
    align-self: center;
  }

  .header-subtitle {
    font-size: 14px;
    margin-left: 2px;
    font-style: italic;
  }

  .header-title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    margin-bottom: -7px;
  }

  .header-title:hover {
    color: $dark-grey;
  }

  .header-title-inner {
    font-size: 10px;
    font-weight: 300;
    margin-left: 2px;
  }

  .title-container:hover {
    cursor: pointer;
  }

  .header-container {
    width: 100%;
    top: 0;
    background-color: $off-white;
    color: #000;
    position: fixed;
    height: 80px;
    z-index: 100;
    border-bottom: 1px solid $mid-grey;
  }

  .header-items {
    display: flex;
    margin: 22px 0;
    justify-content: space-between;
    padding: 0 15px;
  }

    #autosuggest__input {
      outline: none;
      position: relative;
      display: block;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 16px;
      border: 1px solid $mid-grey;
      padding: 7px;
      width: 200px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }
    
    #autosuggest__input.autosuggest__input-open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    
    .autosuggest__results-container {
      position: relative;
      width: 200px;
    }
    
    .autosuggest__results {
      font-weight: 300;
      margin: 0;
      position: absolute;
      z-index: 10000001;
      width: 100%;
      border: 1px solid #e0e0e0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      background: white;
      padding: 0px;
      overflow: scroll;
      max-height: 200px;
    }
    
    .autosuggest__results ul {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }
    
    .item {
      cursor: pointer;
      padding: 15px;
    }
    
    #autosuggest ul:nth-child(1) > .autosuggest__results_title {
      border-top: none;
    }
    
    .autosuggest__results .autosuggest__results_title {
      color: gray;
      font-size: 11px;
      margin-left: 0;
      padding: 15px 13px 5px;
      border-top: 1px solid lightgray;
    }
    
    .item:active,
    .item:hover,
    .item:focus,
    .item.autosuggest__results_item-highlighted {
      background-color: #ddd;
    }




    

    


  @media (max-width:480px) {
      .header-items {
        flex-direction: column;
        align-items: center;
        margin: 15px 0;
      }

      .header-subtitle {
        margin-bottom: 5px;
      }

      .header-title {
        font-size: 30px;
      }

      .header-container {
        height: 120px;
      }
  }
</style>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
  name: 'Header',
  components: {
    VueAutosuggest,
  },
  props: {
    namelist: { type: Array, required: true },
    itemslength: { type: Number, required: true },
  },
  data() {
    return {
      selectedCoin: '',
      filteredOptions: [],
      inputProps: {
        id: "autosuggest__input",
        onInputChange: this.onInputChange,
        placeholder: "Type in coin name"
      },
    }
  },
  computed: {
    coinsList() {
      return [{ data: this.namelist.map(coin => coin.name) }];
    },
  },
  created() {
  },
  methods: {
    onCoinClick() {
      const symbol = this.namelist.filter(coin => coin.name === this.selectedCoin.item)
      if(symbol.length) this.$emit('filterselectedcoin', symbol[0].symbol);
    },

    reloadCoins() {
      this.$emit('reloadcoins', true);
    },

    getSuggestionValue(suggestion) {
      return suggestion.item;
    },

    onInputChange(text, oldText) {
      
      if (text === null) {
        return;
      }

      if (text === '' && this.itemslength === 1) {
        this.$emit('reloadcoins', true);
      }

      const exactMatch = this.coinsList[0].data.filter(option => {
        return option.toLowerCase() === text.toLowerCase().trim()
      }); 
      
 
      const filteredData = this.coinsList[0].data.filter(option => {
        return option.toLowerCase().startsWith(text.toLowerCase())
      }); 

      this.filteredOptions = [{ data: [...exactMatch, ...filteredData] }];
    },

    onSelected(item) {
      this.selectedCoin = item;
      this.onCoinClick()
    },
  },
}
</script>

