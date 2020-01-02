import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    },
    '{ id }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId
      }
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// createPostForUser('ck4vt1whw00si0720gdgywk7l', {
//   title: 'Great books to read',
//   body: 'The War Of Art',
//   published: true
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2));
// });

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId
      },
      data
    },
    '{ author { id } }'
  );
  const user = await prisma.query.user(
    {
      where: {
        id: post.author.id
      }
    },
    '{ id name email posts { id title published } }'
  );
  return user;
};

// updatePostForUser('ck4wzf6t801av0720a46w9or0', { published: false }).then(
//   user => {
//     console.log(JSON.stringify(user, undefined, 2));
//   }
// );
