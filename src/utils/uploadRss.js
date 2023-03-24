import axios from 'axios';
import parser from './parser.js';

export default (url, watchedState) => {
  const {
    existFeeds, feedData, notification,
  } = watchedState;
  const newUrl = new URL(`https://allorigins.hexlet.app/get?url=${url}`);
  newUrl.searchParams.set('disableCache', true);
  return axios
    .get(newUrl)
    .then((response) => {
      if (response.data.contents.match(/<title>Страница не найдена/)) {
        throw new Error();
      }
      watchedState.notification.status = 'responseisOK';
      return response;
    })
    .then((response) => parser(response.data, newUrl.searchParams.get('url')))
    .then((parseData) => {
      watchedState.feedData = [parseData, ...feedData];
      watchedState.existFeeds = [newUrl.searchParams.get('url'), ...existFeeds];
      watchedState.status = 'ShowContent';
    })
    .catch((e) => {
      if (e.message === 'parser') {
        notification.message = 'Ресурс не содержит валидный RSS';
        notification.status = 'parsingError';
        return;
      }
      notification.message = 'Ошибка сети';
      notification.status = 'networkError';
    });
};
