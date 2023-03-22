import onChange from 'on-change';
import {
  errorRender, feedsRander, postsRender, successRender,
} from './renderers/index.js';

export default (state, qElements) => {
  const watchedState = onChange(state, (path, value) => {
    console.log(path)
    switch (path) {
      case 'notification.message':
        if (watchedState.notification.status === 'error') {
          errorRender(watchedState, qElements);
          break;
        }
        successRender(watchedState, qElements);
        break;

      case 'existFeeds':
      //   if (watchedState.existFeeds.length === 1) {
      //     reloadRss(feedData, watchedState, errorsLog);
      //   }
        qElements.form.reset();
        break;
      case 'status':
        if (value === 'DownloadSuccess') {

        }
        if (value === 'ShowContent') {
          console.log('???')
          postsRender(state, qElements);
          feedsRander(state, qElements);
        }
        if (value === 'reload') {
          postsRender(watchedState, qElements);
          watchedState.state = '';
        }
        break;
      default:
        break;
    }
  });
  return watchedState;
};
