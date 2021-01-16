const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FeaturedBlogs = new Schema({
 
  blogs: {
    type: [],
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});


module.exports= mongoose.model('featuredBlog', FeaturedBlogs);