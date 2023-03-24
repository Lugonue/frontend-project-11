import onChange from 'on-change';
import reloadRss from '../utils/reloadRss.js';
import {
  errorRender, feedsRander, modalWindowRender, postsRender, successRender,
} from './renderers/index.js';

export default (state, qElements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'notification.status':
        if (watchedState.notification.status === 'error') {
          errorRender(watchedState, qElements);
        } else if (watchedState.notification.status === 'parsingError') {
          errorRender(watchedState, qElements);
        } else if (watchedState.notification.status === 'networkError') {
          errorRender(watchedState, qElements);
        } else if (watchedState.notification.status === 'responseisOK') {
          successRender(watchedState, qElements);
        }
        watchedState.notification.status = '';
        break;
      case 'existFeeds':
        if (watchedState.existFeeds.length === 1) {
          reloadRss(watchedState);
        }
        qElements.form.reset();
        break;
      case 'feedData':
        if (watchedState.feedData.length === 0) return;
        postsRender(watchedState, qElements);
        feedsRander(watchedState, qElements);
        break;
      case 'modal':
        modalWindowRender(value, qElements, watchedState.feedData);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
