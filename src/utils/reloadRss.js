import axios from 'axios';
import { indexOf } from 'lodash';
import parser from './parser.js';

export default (state) => {
  const { existFeeds } = state;
  const reload = () => {
    const promises = existFeeds.map((url) => {
      const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${url}`);
      newUrl.searchParams.set('disableCache', true);
      return axios.get(`https://allorigins.hexlet.app/get?url=${url}`);
    });
    const promiseAll = Promise.all(promises);
    promiseAll
      .then((responses) => {
        responses.forEach((response) => {
          setTimeout(reload, 5000);
          feedData.forEach((feed) => {
            const respUrl = response.config.url.split('=').slice(1).join('=');
            console.log(feed.url, respUrl);
            if (feed.url === respUrl) {
              const parseData = parser(response.data, feed.url);
              if (Date.parse(feed.pubDate) < Date.parse(parseData.pubDate)) {
                const index = indexOf(feedData, feed);
                feedData[index] = parseData;
                watchedState.state = 'reload';
              }
            }
          });
        });
      })
      .catch(console.log);
  };

  return reload();
};
