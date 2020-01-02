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

createPostForUser('ck4vt1whw00si0720gdgywk7l', {
  title: 'Great books to read',
  body: 'The War Of Art',
  published: true
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2));
});

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'Graphql 101',
//         body: '',
//         published: false,
//         author: {
//           connect: {
//             id: 'ck4vt1whw00si0720gdgywk7l'
//           }
//         }
//       }
//     },
//     '{ id title body published }'
//   )
//   .then(data => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name posts { id title } }');
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: 'ck4wyrkzl016u0720soi6zq38'
//       },
//       data: {
//         body: 'This is how to get going',
//         published: true
//       }
//     },
//     '{ id }'
//   )
//   .then(data => {
//     return prisma.query.posts(null, '{id title body published }');
//   })
//   .then(data => {
//     console.log(data);
//   });
