<template>
  <div class="newsfeed-container">
    <div v-for="article in articlesData" :key="article.articleId">
      <img src="article.urlToImage" />
      <div>
        <p>
          <a href="article.url">{{ article.title }}</a>
          <span>{{ article.source.name }}</span>
        </p>
        <p>{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import uniqueId from 'lodash.uniqueid'

export default {
  name: 'NewsFeed',
  data() {
    return {
      totalArticlesCount: '',
      articlesData: [],
    }
  },
  methods: {
    addId (articlesArr) {
      const articlesArrWithId = articlesArr.map(article => {
        return {...article, articleId: uniqueId('news-id')};
      });
      return articlesArrWithId;
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