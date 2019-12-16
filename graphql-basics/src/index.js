import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar Types - String, Boolean, Int, Float, ID

// Demo user data
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
    author: '3',
    post: '11'
  }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter(posts => {
        const isTitleMatch = posts.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = posts.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me() {
      return {
        id: '123738',
        name: 'Barry Allen',
        email: 'theflash@gmail.com'
      };
    },
    post() {
      return {
        id: '1209',
        title: 'How to do animals',
        body: 'boil eggs',
        published: true
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);

      if (emailTaken) {
        throw new Error('This email is taken');
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      };

      users.push(user);

      return user;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

const options = {
  port: 8000
};

server.start(options, ({ port }) => {
  console.log(`The server is running on port ${port} but not on the treadmill`);
});
