import onChange from 'on-change';
import axios from 'axios';
import {
  object, string, setLocale as yupSetLocale,
} from 'yup';
import i18next from 'i18next';
import render from './renderers.js';
import { ru, en } from '../assets/languages/index.js';
import { reloadRss } from './utils/uploadRss.js';
import parser from './utils/parser.js';

// Выбор элементов для работы с ДОМ
const qElements = {
  form: document.querySelector('.rss-form'),
  errorNotification: document.querySelector('.feedback'),
  inputField: document.querySelector('#url-input'),
  posts: document.querySelector('.posts'),
  feeds: document.querySelector('.feeds'),
  modal: document.querySelector('#modal'),
};

// Старт приложения
export default () => {
  const state = {
    state: '', // состояние отображения контента
    existFeeds: [], // массив добавленных потоков
    error: '', // current error render
  };
  const feedData = [];
  const errorsLog = [];
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'error':
        render.error(watchedState, qElements);
        break;
      case 'existFeeds':
        if (watchedState.existFeeds.length === 1) {
          reloadRss(feedData, watchedState, errorsLog);
        }
        qElements.form.reset();
        break;
      case 'state':
        if (value === 'DownloadSuccess') {
          render.success(watchedState, qElements);
        }
        if (value === 'ShowContent') {
          render.posts(feedData, qElements);
          render.feeds(feedData, qElements);
        }
        if (value === 'reload') {
          render.posts(feedData, qElements);
          watchedState.state = '';
        }
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
          notOneOf: () => ({ key: 'errors.dublicate' }),
          default: 'field_invalid',
        },
        string: {
          url: () => ({ key: 'errors.url' }),
          required: () => ({ key: 'errors.noAddress' }),
        },
      });
      // контроллер на форме
      qElements.form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        // валидация
        const myschema = object({
          website: string().url().required().notOneOf(watchedState.existFeeds),
        });
        myschema.validate({ website: qElements.inputField.value.trim() })
          .then(({ website }) => {
            // функция загрузки потока новостей. Добавляет новый поток к state
            axios
              .get(`https://allorigins.hexlet.app/raw?url=${website}`)
              .then((response) => {
                watchedState.error = '';
                watchedState.state = 'DownloadSuccess';
                const parseData = parser(response.data, website);
                feedData.push(parseData);
                watchedState.existFeeds.push(website);
                watchedState.state = 'ShowContent';
              })
              .catch((errByLoad) => {
                errorsLog.push({ errorMsg: errByLoad.message });
                console.log(errByLoad.message);
                watchedState.error = instanseOfi18next.t('errors.net');
              });
          })
          .catch((e) => {
            console.log(e);
            const messages = e.errors.map((error) => instanseOfi18next.t(error.key));
            watchedState.error = messages.join('<br>');
          });
      });
      qElements.posts.addEventListener('click', (ev) => {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        if (ev.target.type !== 'button') return;
        render.modal(ev.target.parentNode, qElements.modal, feedData);
      });
    });
};
