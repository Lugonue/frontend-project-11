// рендер
export default render = {
  error: (state) => {
    errorNotification.textContent = watchedState.error;
    const input = document.querySelector('#url-input');
    input.classList.add('is-invalid');
  },

};
