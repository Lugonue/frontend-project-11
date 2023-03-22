const errorRender = (watchedState, qElements) => {
  const { inputField, errorNotification } = qElements;
  if (!errorNotification.classList.contains('text-danger')) {
    errorNotification.classList.add('text-danger');
  }
  errorNotification.innerHTML = watchedState.notification.message;
  inputField.classList.add('is-invalid');
};

const successRender = (watchedState, qElements) => {
  const { errorNotification, inputField } = qElements;
  inputField.classList.remove('is-invalid');
  errorNotification.classList.remove('text-danger');
  errorNotification.classList.add('text-success');
  errorNotification.innerHTML = watchedState.i18next('success');
};

export {
  errorRender,
  successRender,
};
