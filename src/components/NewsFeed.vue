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
                width="90px"
                height="80px"
              >
            </div>
            <div class="news-source-container">
              <a
                :href="article.url"
                target="_blank"
                class="newsfeed-link"
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
      <p class="news-loading-container">
        <span style="margin-right: 5px;">Loading articles</span>
        <img
          src="../assets/loader-small.svg"
        >
      </p>
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
      if (this.cryptocur.toLowerCase() === 'tronix') return "Tron"
      return this.cryptocur
    },
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    setArrLength(arr) {
      if (arr.length < 9) return arr.length - 1;
      return 9
    },
    async fetchArticles() {
      try {
        const setCoinQueryName = this.cryptocurName.toLowerCase().split(' ').join('-')
        const articlesData = await api.coinNewsApi.getTopNewsByCoin(setCoinQueryName, 'en')
        this.loadingArticles = false
        if (articlesData.length) {
          this.articlesData = articlesData.slice(0, this.setArrLength(articlesData))
        } else {
          this.articlesData = []
        }
        
      } catch(e) {
        this.loadingArticles = false
      }
    },
  },

}
</script>

<style lang="scss">

.news-loading-container {
  display: flex;
  margin: 0;
}

.news-img-container {
  padding: 5px;
}
.newsfeed-link {
  text-decoration: none;
  font-weight: 500;
  color: #413e7e;
}
.newsfeed-link:hover {
  text-decoration: underline;
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
  font-size: 13px;
  margin-top: 10px;
}
.news-source-container {
  padding: 5px;
}
.newsfeed-container {
  margin: 20px 30px 0 30px;
  overflow-y: scroll;
  height: 250px;
}
</style>