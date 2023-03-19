import { uniqueId } from 'lodash';

const parser = new DOMParser();

export default (data) => {
  const result = parser.parseFromString(data, 'text/xml');
  const parseData = {
    posts: [],
    feed: {},
  };
  parseData.feed = {
    id: uniqueId(),
    title: result.querySelector('title').innerHTML.trim().replace(/[^\W]/gm, ''),
    description: result.querySelector('description').innerHTML.trim().replace(/[^\W]/gm, ''),
  };
  result.querySelectorAll('item').forEach((e) => {
    const title = e.querySelector('title').innerHTML.trim().replace(/[^\W]/gm, '');
    const link = e.querySelector('link').innerHTML.trim();
    const description = e.querySelector('description').innerHTML.trim().replace(/[^\W]/gm, '');
    const pubDate = e.querySelector('pubDate').innerHTML.trim();

    parseData.posts.push({
      id: uniqueId(),
      feedId: parseData.feed.id,
      title,
      link,
      description,
      pubDate,
    });
  });
  return parseData;
};
