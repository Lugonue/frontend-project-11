export default (whatchedState, qElements) => {
  const { feedData } = whatchedState;
  const { posts } = qElements;
  posts.innerHTML = '';
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
  feedData.reverse().forEach((rss) => {
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
};
