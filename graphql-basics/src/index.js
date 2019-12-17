import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar Types - String, Boolean, Int, Float, ID

// Demo user data
let users = [
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
let posts = [
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

let comments = [
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
      createUser(data: CreateUserInput!): User!
      deleteUser(id: ID!): User!
      createPost(data: CreatePostInput!): Post!
      deletePost(id: ID!): Post!
      createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
      name: String!
      email: String!
      age: Int 
    }

    input CreatePostInput {
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput {
      text: String!
      author: ID!
      post: ID!
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
      const emailTaken = users.some(user => user.email === args.data.email);

      if (emailTaken) {
        throw new Error('This email is taken');
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id);
        }
        return !match;
      });

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex(post => post.id === args.id);

      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      const deletedPosts = posts.splice(postIndex, 1);

      comments = comments.filter(comment => comment.post !== args.id);

      return deletedPosts[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);
      const postExists = posts.some(
        post => post.id === args.data.post && post.published
      );

      if (!userExists || !postExists) {
        throw new Error('Unable to find user and post');
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);

      return comment;
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
