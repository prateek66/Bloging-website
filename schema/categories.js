const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
 
  data: {
    type: [],
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  post:{
    type: Schema.Types.ObjectId, ref: 'Post'
}
});


module.exports= mongoose.model('Category', CategoriesSchema);