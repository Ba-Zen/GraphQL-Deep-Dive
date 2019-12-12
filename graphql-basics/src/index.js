import { GraphQLServer } from 'graphql-yoga';

// Scalar Types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Truffles';
    },
    price() {
      return '899.99';
    },
    releaseYear() {
      return 2019;
    },
    rating() {
      return '5.0';
    },
    inStock() {
      return true;
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
