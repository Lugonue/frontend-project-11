import onChange from 'on-change';
import {
  object, string, setLocale as yupSetLocale,
} from 'yup';
import i18next from 'i18next';
import _ from 'lodash';
import render from './renders.js';
import { ru, en } from '../assets/languages/index.js';
import uploadRss from './utils/uploadRss.js';

// Выбор элементов для работы с ДОМ
const qElements = {
  form: document.querySelector('.rss-form'),
  errorNotification: document.querySelector('.feedback'),
  inputField: document.querySelector('#url-input'),
};

// Старт приложения
export default () => {
  const state = {
    state: '',
    existFeeds: [],
    error: '',
    feedData: [],

  };

  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'error':
        render.error(watchedState, qElements);
        break;
      case 'existFeeds':

        qElements.form.reset();
        break;
      default:
        break;
    }
  });

  const instanseOfi18next = i18next.createInstance();
  instanseOfi18next.init({
    lng: 'ru',
    resources: {
      ru,
      en,
    },
    debug: true,
  })
    .then((err) => {
      if (err) console.log('something went wrong loading', err);
      // валидация
      yupSetLocale({
        mixed: {
          default: 'field_invalid',
        },
        string: {
          url: () => ({ key: 'errors.url' }),
          required: () => ({ key: 'errors.noAddress' }),
          notOneOf: () => ({ key: 'errors.dublicate' }),
        },
      });
      const myschema = object({
        website: string().url().required().notOneOf(watchedState.existFeeds),
      });
      // контроллер на форме
      qElements.form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        myschema.validate({ website: qElements.inputField.value })
          .then(({ website }) => {
            // функция загрузки потока новостей. Добавляет новый поток к state
            uploadRss(watchedState, website);
          })
          .catch((e) => {
            const messages = e.errors.map((error) => instanseOfi18next.t(error.key));
            console.log(messages);
            watchedState.error = messages.join('<br>');
          });
      });
    });
};
