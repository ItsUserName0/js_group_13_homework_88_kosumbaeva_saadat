const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (e) {
    return next(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    // if (!req.body.title) {
    //   return res.status(422).send({error: 'Title is required!'});
    // } else if (!req.body.description && !req.file) {
    //   return res.status(422).send({error: 'Description or image is required!'});
    // }

    const postData = {
      user: req.user,
      title: req.body.title,
      description: null,
      image: null,
    };

    if (req.body.description) {
      postData.description = req.body.description;
    }

    if (req.file) {
      postData.image = req.file.filename;
    }

    const post = new Post(postData);
    await post.save();

    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    return next(e);
  }
});

module.exports = router;