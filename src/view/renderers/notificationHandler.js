const errorRender = (watchedState, qElements) => {
  const { inputField, errorNotification } = qElements;
  if (!errorNotification.classList.contains('text-danger')) {
    errorNotification.classList.add('text-danger');
  }
  errorNotification.textContent = watchedState.notification.message;
  inputField.classList.add('is-invalid');
};

const successRender = (watchedState, qElements) => {
  const { errorNotification, inputField } = qElements;
  inputField.classList.remove('is-invalid');
  errorNotification.classList.remove('text-danger');
  errorNotification.classList.add('text-success');
  errorNotification.textContent = watchedState.i18nextInstance('success');
};

export {
  errorRender,
  successRender,
};
