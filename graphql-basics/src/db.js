const users = [
  {
    id: '1',
    name: 'Bazen',
    email: 'bazen@bazen.com',
    age: 26
  },
  {
    id: '2',
    name: 'Barry',
    email: 'barray@barry.com',
    age: 29
  },
  {
    id: '3',
    name: 'Shazam',
    email: 'shazam@shazam.com',
    age: 109
  }
];
const posts = [
  {
    id: '10',
    title: 'Guide To Eggs',
    body: 'Lorem ipsum doe',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'How to be a caveman',
    body: 'Hello, farewell to youu my frieeeennnd! - Issa Barney song',
    published: false,
    author: '1'
  },
  {
    id: '12',
    title:
      'What to do with two lemons when life puts them in your Christmas stockings',
    body:
      'Tell me what you want, what you really, really want. i"ll tell ya what I want what I really really want- Spice Girls',
    published: true,
    author: '3'
  }
];

const comments = [
  {
    id: '101',
    text: 'This is insightful, will try this',
    author: '2',
    post: '10'
  },
  {
    id: '102',
    text: 'Cool spin on this, enjoy your perspective!',
    author: '2',
    post: '10'
  },
  {
    id: '103',
    text: 'I enjoyed the part about butter. - S',
    author: '3',
    post: '11'
  },
  {
    id: '104',
    text: 'I do not enjoy reading but read all your work! - S',
    author: '1',
    post: '12'
  }
];

const db = {
  users,
  posts,
  comments
};

export { db as default };
