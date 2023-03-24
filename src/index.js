import './styles.scss';
import i18next from 'i18next';
import 'bootstrap';
import ru from '../assets/languages/ru.js';
import app from './app.js';

const instanseOfi18next = i18next.createInstance();
instanseOfi18next
  .init({
    lng: 'ru',
    resources: {
      ru,
    },
    debug: true,
  })
  .catch(() => new Error('something went wrong loading'))
  .then((t) => {
    const state = { // инициализация состояния
      status: '',
      notification: {
        status: null,
        message: '',
      }, // состояние отображения контента
      existFeeds: [], // массив добавленных потоков
      error: '', // current error render
      i18nextInstance: t,
      feedData: [],
      modal: null,
    };

    app(state);
  });
