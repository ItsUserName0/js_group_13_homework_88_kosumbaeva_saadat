const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.find({post: req.params.id}, null, {sort: {'_id': -1}}).populate('author');
    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    if (!req.body.description) {
      return res.status(422).send({message: 'Description is required'});
    }

    const commentData = {
      author: req.user,
      description: req.body.description,
      post: req.body.post,
    };

    const comment = new Comment(commentData);
    await comment.save();

    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

module.exports = router;