import './styles.scss';
import app from './app.js';
import 'bootstrap';
import i18next from 'i18next';
import { ru } from '../assets/languages/index.js';

const instanseOfi18next = i18next.createInstance();
instanseOfi18next
  .init({
    lng: 'ru',
    resources: {
      ru,
    },
  })
  .catch((e) => new Error('something went wrong loading'))
  .then((t) => {
    const state = { // инициализация состояния
      status: '',
      notification: {
        status: null,
        message: '',
      }, // состояние отображения контента
      existFeeds: [], // массив добавленных потоков
      error: '', // current error render
      i18next: t,
      feedData: [],
    };

    app(state);
  });
