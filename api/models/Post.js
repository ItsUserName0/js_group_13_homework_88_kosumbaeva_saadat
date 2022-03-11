const mongoose = require('mongoose');
const path = require("path");
const Schema = mongoose.Schema;

const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.apng', '.svg', '.webp'];

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
      validator: async function () {
        if (this.description || this.image) return true;
        else if (!this.description && !this.image) return false;
      },
      message: 'Description or image is required!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (value) {
        const ext = path.extname(value);
        return EXTENSIONS.includes(ext);
      },
      message: 'Image file format is incorrect!'
    }
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;