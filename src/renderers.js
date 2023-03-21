// рендер
export default {
  error: (watchedState, qElements) => {
    if (!qElements.errorNotification.classList.contains('text-danger')) {
      qElements.errorNotification.classList.add('text-danger');
    }
    if (watchedState.error === '') {
      qElements.inputField.classList.remove('is-invalid');
      return;
    }
    qElements.errorNotification.innerHTML = watchedState.error;
    qElements.inputField.classList.add('is-invalid');
  },
  success: (watchedState, qElements) => {
    if (watchedState.error === '') {
      qElements.errorNotification.classList.remove('text-danger');
      qElements.errorNotification.classList.add('text-success');
      qElements.errorNotification.innerHTML = 'RSS успешно загружен';
    }
  },
  posts: (feedData, qElements) => {
    qElements.posts.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card border-0';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = 'Посты';
    cardBody.append(h2);
    card.append(cardBody);

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';
    feedData.forEach((rss) => {
      rss.posts.forEach((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        li.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';
        a.href = post.link;
        a.textContent = post.title;
        li.dataset.id = post.id;
        a.className = post.isRead ? 'fw-normal link-secondary' : 'fw-bolder';
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary btn-sm';
        button.textContent = 'Просмотр';
        button.type = 'button';
        button.dataset.bsToggle = 'modal';
        button.dataset.bsTarget = '#modal';

        li.append(a);
        li.append(button);
        ul.append(li);
      });
    });
    qElements.posts.append(card);
    qElements.posts.append(ul);
  },
  feeds: (feedData, qElements) => {
    qElements.feeds.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card border-0';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = 'Фиды';
    cardBody.append(h2);
    card.append(cardBody);

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';
    feedData.forEach((rss) => {
      const li = document.createElement('li');
      li.className = 'list-group-item border-0 border-end-0';
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      h3.className = 'h6 m-0';
      h3.textContent = rss.title;
      p.className = 'm-0 small text-black-50';
      p.textContent = rss.description;

      li.append(h3);
      li.append(p);

      ul.prepend(li);
    });
    qElements.feeds.append(card);
    qElements.feeds.append(ul);
  },
  modal: (element, modal, feedData) => {
    const index = element.dataset.id;
    feedData.forEach((rss) => {
      rss.posts.forEach((post) => {
        if (post.id !== index) return;
        post.isRead = true;
        const a = element.querySelector('a');
        a.className = 'fw-normal link-secondary';
        modal.querySelector('h5').textContent = post.title;
        modal.querySelector('.modal-body').textContent = post.description;
      });
    });
  },

};
