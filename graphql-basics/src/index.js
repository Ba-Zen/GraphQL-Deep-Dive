import { GraphQLServer } from 'graphql-yoga';

// Scalar Types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        add(a: Float!, b: Float!): Float!
        greeting(name: String, position: String): String!
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
    add(parent, args, ctx, info) {
      if (args.a && args.b) {
        return args.a + args.b;
      } else {
        return "Didn't work pal";
      }
    },
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}!`;
      } else {
        return 'Hello!';
      }
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
