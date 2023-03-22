import parser from "../src/utils/parser.js";


const response = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Новые уроки на Хекслете</title>
    <description>Практические уроки по программированию</description>
    <link>https://ru.hexlet.io/</link>
    <webMaster>info@hexlet.io</webMaster>
    <item>
      <title>Поиск в ширину / Алгоритмы на графах</title>
      <guid isPermaLink="false">3725</guid>
      <link>https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-breadth-search/theory_unit</link>
      <description>Цель: Изучаем поиск в ширину и неявные графы</description>
      <pubDate>Wed, 22 Mar 2023 10:02:16 +0000</pubDate>
    </item>
  </channel>
</rss>
`

const expect = {
  url: 'https://ru.hexlet.io',
  id: '1',
  title: 'Новые уроки на Хекслете',
  description: 'Практические уроки по программированию',
  pubDate: 'Wed, 22 Mar 2023 10:02:16 +0000',
  posts: [{
    id: '2',
    feedId: '1',
    title: 'Поиск в ширину / Алгоритмы на графах',
    link: 'https://ru.hexlet.io/courses/algorithms-graphs/lessons/in-breadth-search/theory_unit',
    description: 'Цель: Изучаем поиск в ширину и неявные графы',
    pubDate: 'Wed, 22 Mar 2023 10:02:16 +0000',
  }],
};

test('parser', () => {
  const actual = parser( response, 'https://ru.hexlet.io/lessons.rss');

  expect(actual).toEqual(expect);
})