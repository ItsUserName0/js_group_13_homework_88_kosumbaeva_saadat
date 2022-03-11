const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (value) {
        if (value) return false;
        else if (!value && this.image.value) return false;
      },
      message: 'Description or image is required!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (value) {
        if (value) return false;
        else if (!value && this.description.value) return false;
      },
      message: 'Description or image is required!',
    }
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;