<template>
  <div class="newsfeed-container">
    <div v-if="articlesData.length">
      <div
        v-for="article in articlesData"
        :key="article._id"
      >
        <div>
          <img
            :src="article.originalImageUrl"
            width="100px"
            height="100px"
          >
          <div>
            <a
              :href="article.url"
              target="_blank"
            >{{ article.title }}</a>
            <p>{{ article.source.name }}</p>
          </div>
          <p>{{ article.description }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="!articlesData.length"
    >
      <p>No headlines availble</p>
    </div>
  </div>
</template>

<script>

import uniqueId from 'lodash.uniqueid'

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
    }
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const articlesData = await api.coinNewsApi.getTopNewsByCoin(this.cryptocur, 'en');
        // add a check for array length
        this.articlesData = articlesData.slice(0, 9)
      } catch(e) {
        console.log(e);
      }
    },
  },

}
</script>

<style lang="scss">

</style>