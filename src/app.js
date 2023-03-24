import watcher from './view/watcher.js';
import formValidator from './validators/formValidator.js';
import uploadRss from './utils/uploadRss.js';

export default (state) => { // Старт приложения
  const { i18nextInstance } = state;

  const qElements = { // Выбор элементов для работы с ДОМ
    form: document.querySelector('.rss-form'),
    errorNotification: document.querySelector('.feedback'),
    inputField: document.querySelector('#url-input'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    modal: document.querySelector('#modal'),
  };

  const watchedState = watcher(state, qElements); // инициализация view компонента

  qElements.form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const inputRssUrl = qElements.inputField.value.trim();
    // инициализация схемы валидатора формы
    const formValidation = formValidator(watchedState.existFeeds);
    formValidation
      .validate({ url: inputRssUrl })
      // функция загрузки потока новостей. Добавляет новый поток к state
      .then(({ url }) => uploadRss(url, watchedState))
      .catch((error) => {
        watchedState.notification.message = i18nextInstance(error.message.key);
        watchedState.notification.status = 'error';
      });
  });
  qElements.posts.addEventListener('click', (ev) => {
    ev.stopImmediatePropagation();
    ev.preventDefault();
    if (ev.target.type !== 'button') return;
    watchedState.modal = ev.target.parentNode;
  });
};
