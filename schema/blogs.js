const { Int32 } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  author: {
    type: String,
    default:'',
    required:true
  },
  description: {
    type: String,
    default:'',
    required:true
  },
  ispublished:{
      type:Boolean,
      default:false
  },
  isFeatured:{
    type:Boolean,
    default:false
  },
  views:{
    type:Number,
    default:0
  },
  category:{
    type: []
  },
  uploads:{

  },
  thumbnail: {
    type: String,
    default:'',
    required:true
  }
});


module.exports= mongoose.model('Post', PostSchema);