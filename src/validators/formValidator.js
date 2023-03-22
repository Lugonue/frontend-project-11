import {
  object, string, setLocale as yupSetLocale,
} from 'yup';

// валидация
// локализуем сообщения об ошибках
export default (existFeeds) => {
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
  // валидация, создаем схему валидации
  const validationSchema = object({
    url: string().url().required().notOneOf(existFeeds),
  });

  return validationSchema;
};
