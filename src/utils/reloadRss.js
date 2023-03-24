import axios from 'axios';
import { indexOf } from 'lodash';
import parser from './parser.js';

export default (watchedState) => {
  const reload = () => {
    const { existFeeds, feedData } = watchedState;
    setTimeout(reload, 5000);
    const promises = existFeeds.map((url) => {
      const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${url}`);
      newUrl.searchParams.set('disableCache', true);
      return axios.get(newUrl);
    });
    const promiseAll = Promise.all(promises);
    promiseAll
      .then((responses) => {
        responses.forEach((response) => {
          feedData.forEach((feed) => {
            const respUrl = response.config.url.searchParams.get('url');
            if (feed.url === respUrl) {
              try {
                const parsedData = parser(response.data, respUrl);
              } catch {
                throw new Error('parser');
              }
              // console.log(Date.parse(feed.pubDate), Date.parse(parseData.pubDate))
              if (Date.parse(feed.pubDate) < Date.parse(parsedData.pubDate)) {
                const index = indexOf(feedData, feed);
                feedData[index] = parsedData;
              }
            }
          });
        });
      })
      .catch((e) => {
        if (e.message === 'parser') {
          watchedState.notification.message = 'Ресурс не содержит валидный RSS, после перезагрузки потока';
          watchedState.notification.status = 'parsingError';
          return;
        }
        watchedState.notification.message = 'Ошибка сети, во время перезагрузки потока';
        watchedState.notification.status = 'networkError';
      });
  };

  return reload();
};
