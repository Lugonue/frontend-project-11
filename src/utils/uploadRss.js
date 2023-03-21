import axios from 'axios';
import { indexOf } from 'lodash';
import parser from './parser.js';

// const uploadRss = (watchedState, feedData, website, errorsLog) => 
//   .then((response) => {
    
//   })
 

const reloadRss = (feedData, watchedState, errorsLog) => {
  const reload = () => {
    const websites = watchedState.existFeeds;
    const promises = websites.map((i) => axios.get(`https://allorigins.hexlet.app/raw?url=${i}`));
    const promiseAll = Promise.all(promises);
    promiseAll
      .then((responses) => {
        responses.forEach((response) => {
          setTimeout(reload, 5000);
          feedData.forEach((feed) => {
            const respUrl = response.config.url.split('=').slice(1).join('=');

            console.log(feed);
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

export {
  uploadRss,
  reloadRss,
};
