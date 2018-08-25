<template>
  <div class="newsfeed-container">
    <div v-if="articlesData.length">
      <div
        v-for="article in articlesData"
        :key="article._id"
      >
        <div class="news-row-section">
          <div class="news-top-section">
            <div class="news-img-container">
              <img
                :src="article.originalImageUrl"
                width="60px"
                height="60px"
              >
            </div>
            <div class="news-source-container">
              <a
                :href="article.url"
                target="_blank"
              >{{ article.title }}</a>
              <p class="news-source-name">{{ article.source.name }}</p>
            </div>
          </div>
          <p>{{ article.description }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="!articlesData.length && !loadingArticles"
    >
      <p>No headlines availble</p>
    </div>

    <div
      v-if="loadingArticles"
    >
      <p>Loading articles...</p>
    </div>
  </div>
</template>

<script>

import api from '../api/api'

export default {
  name: 'NewsFeed',
  props: {
    cryptocur: { type: String, required: true },
  },
  data() {
    return {
      totalArticlesCount: '',
      articlesData: [],
      loadingArticles: true,
    }
  },
  computed: {
    cryptocurName () {
      if (this.cryptocur.toLowerCase() === 'xrp') return "Ripple"
      return this.cryptocur
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    setArrLength(arr) {
      if (arr.length < 9) return arr.length
      return 9
    },
    async fetchArticles() {
      try {
        const setCoinQueryName = this.cryptocurName.toLowerCase().split(' ').join('-')
        const articlesData = await api.coinNewsApi.getTopNewsByCoin(setCoinQueryName, 'en')
        this.loadingArticles = false
        // add a check for array length
        this.articlesData = articlesData.slice(0, this.setArrLength(articlesData))
      } catch(e) {
        this.loadingArticles = false
        console.log(e);
      }
    },
  },

}
</script>

<style lang="scss">
.news-img-container {
  padding: 5px;
}
.news-top-section {
  display: flex;
  min-height: 70px;
}
.news-source-name {
  margin: 0;
  margin-top: 5px;
}
.news-row-section {
  font-size: 14px;
}
.news-source-container {
  padding: 5px;
}
.newsfeed-container {
  margin: 10px;
  overflow-y: scroll;
  height: 250px;
}
</style>