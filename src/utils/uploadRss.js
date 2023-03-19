import axios from 'axios';
import parser from './parser.js';

export default (watchedState, website) => axios.get(`https://allorigins.hexlet.app/raw?url=${website}`)
  .then((response) => {
    if (response.status === 200) {
      watchedState.error = '';
      watchedState.existFeeds.push(website);
      const parseData = parser(response.data);
      watchedState.feedData.push(parseData);
      console.log(watchedState.feedData[0].feed);
    }
  })
  .catch((err) => {
    watchedState.error = err.message;
  });
