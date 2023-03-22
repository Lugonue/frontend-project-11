import axios from 'axios';
import parser from './parser.js';

export default (url, state) => {
  const {
    feedData, notification, i18next, existFeeds,
  } = state;
  const newUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`
  axios
    .get(newUrl)
    .then((response) => {
      state.notification.status = null;
      state.notification.message = i18next('success');
      return response;
    })
    .then((response) => parser(response.data, url))
    .then((parseData) => {
      state.feedData = [parseData, ...feedData];
      state.existFeeds = [url, ...existFeeds];
      state.status = 'ShowContent';
    })
    .catch((e) => {
      console.log(e);
      notification.status = 'error';
      if (e.message === 'parser') {
        notification.message = i18next('errors.parsing');
        return;
      }
      notification.message = i18next('errors.net');
    });
};
