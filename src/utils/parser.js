import { uniqueId } from 'lodash';

// const formatter = (string) => string; // .trim().replace(/[^\w^ ]/gm, '');

export default (data, url) => {
  try {
    const parser = new DOMParser();
    const result = parser.parseFromString(data, 'text/xml');
    console.log(result)
    const parseData = {
      url,
      id: uniqueId(),
      title: result.querySelector('title').textContent,
      description: result.querySelector('description').textContent,
      pubDate: result.querySelector('pubDate').textContent.trim(),
      posts: [],
    };
    
    result.querySelectorAll('item').forEach((e) => {
      const title = e.querySelector('title').textContent;
      const link = e.querySelector('link').textContent.trim();
      const description = e.querySelector('description').textContent;
      const pubDate = e.querySelector('pubDate').textContent.trim();
      parseData.posts.push({
        id: uniqueId(),
        feedId: parseData.id,
        title,
        link,
        description,
        pubDate,
      });
    });
    return parseData;
  } catch (e) {
    console.log(e.message)
    throw new Error('parser');
  }
};
