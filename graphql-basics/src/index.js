import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is a query!! exclaimed the developer';
    },
    name() {
      return 'Bazen Berhane';
    },
    location() {
      return 'Boston';
    },
    bio() {
      return 'Bazen is a simple man, he prefers cookies with his milk.';
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
