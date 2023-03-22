import _ from 'lodash';

const formatter = (string) => string; // .trim().replace(/[^\w^ ]/gm, '');

export default (data, website) => {
  const parser = new DOMParser();
  const result = parser.parseFromString(data, 'text/xml');
  const parseData = {
    url: website,
    id: _.uniqueId(),
    title: formatter(result.querySelector('title').innerHTML),
    description: formatter(result.querySelector('description').innerHTML),
    pubDate: result.querySelector('pubDate').innerHTML.trim(),
    posts: [],
  };
  result.querySelectorAll('item').forEach((e) => {
    const title = formatter(e.querySelector('title').innerHTML);
    const link = e.querySelector('link').innerHTML.trim();
    const description = formatter(e.querySelector('description').innerHTML);
    const pubDate = e.querySelector('pubDate').innerHTML.trim();

    parseData.posts.push({
      id: _.uniqueId(),
      feedId: parseData.id,
      title,
      link,
      description,
      pubDate,
    });
  });
  return parseData;
};
