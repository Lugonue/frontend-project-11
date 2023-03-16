import onChange from 'on-change';
import {
  object, string,
} from 'yup';
import render from './renders';

export default () => {
  const form = document.querySelector('.rss-form');
  const errorNotification = document.querySelector('.feedback');

  const state = {
    input: '',
    existFeeds: [],
    error: '',

  };
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'error':
        render.error(state);
        break;
      case 'existFeeds':
        errorNotification.textContent = '';
        form.reset();
    }
  });

  // валидация
  const myschema = object({
    website: string('must be a string').url('Ссылка должна быть валидным URL!').required('Необходимо ввести адрес').notOneOf(watchedState.existFeeds, 'Ссылка уже добавлена!'),
  });
  // контроллер
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    console.log(form.url.value);
    myschema.validate({ website: form.url.value })
      .catch((e) => {
        watchedState.error = e.message;
      })
      .then(({ website }) => {
        watchedState.existFeeds = website;
      });
  });
};
