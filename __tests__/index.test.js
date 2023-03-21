// import uploadRss from "../src/utils/uploadRss.js";
import { DOMParser } from 'xmldom';
import parser from '../src/utils/parser.js';

const xml = `<title>
<![CDATA[ Lorem ipsum feed for an interval of 10 seconds with 10 item(s) ]]>
</title>
<description>
<![CDATA[ This is a constantly updating lorem ipsum feed ]]>
</description>
<link>http://example.com/</link>
<generator>RSS for Node</generator>
<lastBuildDate>Mon, 20 Mar 2023 08:00:41 GMT</lastBuildDate>
<pubDate>Mon, 20 Mar 2023 08:00:40 GMT</pubDate>`;

const expected = {
  id: '1',
  title: 'Lorem ipsum feed for an interval of 10 seconds with 10 item(s)',
  description: 'This is a constantly updating lorem ipsum feed',
  pubDate: 'Mon, 20 Mar 2023 08:00:40 GMT',
  posts: [],
};

test('parser test', () => {
  const testParser = new DOMParser();
  const acutal = parser(xml, testParser);
  expected(expected).toEqual(acutal);
});

// test('test uploadRss', async () => {
//   const testRssUrl = 'http://lorem-rss.herokuapp.com/feed';
//   const state = {};
//   await uploadRss(state, testRssUrl);
//   expect()

// })
