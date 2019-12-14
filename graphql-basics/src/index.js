import { GraphQLServer } from 'graphql-yoga';

// Scalar Types - String, Boolean, Int, Float, ID

// Demo user data
const posts = [
  {
    id: '1',
    title: 'Guide To Eggs',
    body: 'Lorem ipsum doe',
    published: true
  },
  {
    id: '2',
    title: 'How to be a caveman',
    body: 'Hello, farewell to youu my frieeeennnd! - Issa Barney song',
    published: false
  },
  {
    id: '3',
    title:
      'What to do with two lemons when life puts them in your Christmas stockings',
    body:
      'Tell me what you want, what you really, really want. i"ll tell ya what I want what I really really want- Spice Girls',
    published: true
  }
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
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
