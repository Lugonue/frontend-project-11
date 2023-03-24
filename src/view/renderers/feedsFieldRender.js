export default (whatchedState, qElements) => {
  const { feedData } = whatchedState;
  const { feeds } = qElements;
  feeds.innerHTML = '';
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
};
