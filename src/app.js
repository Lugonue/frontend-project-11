import render from './view/renderers/index.js';
import reloadRss from './utils/reloadRss.js';
import watcher from './view/watcher.js';
import formValidator from './validators/formValidator.js';
import uploadRss from './utils/uploadRss.js';

export default (state) => { // Старт приложения
  const { notification, existFeeds, i18next } = state;

  const qElements = { // Выбор элементов для работы с ДОМ
    form: document.querySelector('.rss-form'),
    errorNotification: document.querySelector('.feedback'),
    inputField: document.querySelector('#url-input'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    modal: document.querySelector('#modal'),
  };

  const watchedState = watcher(state, qElements); // иницилизация view компонента

  qElements.form.addEventListener('submit', (ev) => {
    console.log(state);
    ev.preventDefault();
    const inputRssUrl = qElements.inputField.value.trim();
    const formValidation = formValidator(existFeeds); // иницилизация схемы валидатора формы
    formValidation
      .validate({ url: inputRssUrl })
      .then(() => uploadRss(inputRssUrl, watchedState))// функция загрузки потока новостей. Добавляет новый поток к state
      .then(() => reloadRss(watchedState))
      .catch((error) => {
        watchedState.notification.status = 'error';
        watchedState.notification.message = i18next(error.message.key);
      });
  });
  // qElements.posts.addEventListener('click', (ev) => {
  //   ev.stopImmediatePropagation();
  //   ev.preventDefault();
  //   if (ev.target.type !== 'button') return;
  //   render.modal(ev.target.parentNode, qElements, feedData);
  // });
};
