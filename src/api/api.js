import CryptoNewsApi from 'crypto-news-api'

const coinNewsApi = new CryptoNewsApi(process.env.VUE_APP_NEWS_API_KEY);

export default {
  async startFetchJsonData(url, options, n = 1) {
    try {
      const res = await fetch(url, options);
      if (res.status === 200 || res.status === 204) {
        const data = await res.json();
        return data;
      }
  
      if (res.status === 403) return { error: 'Not authorized' };
      return { error: res.message || 'There was an error, please try again later' };
    } catch (e) {
      if (n === 1) return { error: NETWORK_ERROR_MESSAGE };
      const retry = await startFetchJsonData(url, options, n - 1);
      return retry;
    }
  },
  coinNewsApi
};

