const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(posts => {
      const isTitleMatch = posts.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = posts.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
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
};

export { Query as default };
