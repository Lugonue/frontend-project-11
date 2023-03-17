// рендер
export default {
  error: (watchedState, qElements) => {
    if (watchedState.error === '') {
      qElements.inputField.classList.remove('is-invalid');
      return;
    }
    qElements.errorNotification.innerHTML = watchedState.error;
    qElements.inputField.classList.add('is-invalid');
  },

};
