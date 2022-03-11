const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require("./config");
const User = require('./models/User');
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [User1, User2, User3] = await User.create(
    {
      email: 'user@user',
      password: '123',
      displayName: 'John Doe',
      token: nanoid(),
    },
    {
      email: 'user2@user',
      password: '123',
      displayName: 'Jane Shepard',
      token: nanoid(),
    },
    {
      email: 'user3@user',
      password: '123',
      displayName: 'Isaac',
      token: nanoid(),
    },
  );

  const [Post1, Post2, Post3] = await Post.create(
    {
      user: User1,
      title: 'Post1',
      description: 'Post 1 description.',
      image: 'post1.jpg',
    },
    {
      user: User2,
      title: 'Post2',
      description: 'Post 2 description.',
      image: 'post2.jpg',
    },
    {
      user: User3,
      title: 'Post3',
      description: 'Post 3 description.',
      image: 'post3.jpg',
    });

  await Comment.create(
    {
      author: User1,
      post: Post1,
      description: 'Comment1',
    },
    {
      author: User2,
      post: Post2,
      description: 'Comment2',
    },
    {
      author: User3,
      post: Post3,
      description: 'Comment3',
    });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));