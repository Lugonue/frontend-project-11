export default (element, qElements, feedData) => {
  const { modal } = qElements;
  const index = element.dataset.id;
  feedData.forEach((rss) => {
    rss.posts.forEach((post) => {
      const { id } = post;
      if (id !== index) return;
      post.isRead = true;
      const a = element.querySelector('a');
      a.className = 'fw-normal link-secondary';
      modal.querySelector('h5').textContent = post.title;
      modal.querySelector('.modal-body').textContent = post.description;
      modal.querySelector('a').href = post.link;
    });
  });
};
