const mongoose = require('mongoose')
const Schema = mongoose.Schema

const category = new Schema({
        title:{
            type:String
        },
        
        post:{
             type: Schema.Types.ObjectId, ref: 'Post'
        }

})    
module.exports= mongoose.model('Category', category);
