const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    name: {type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    date: {type: Date, require: Date.now()},
    isAnswered:{type:Boolean,required:false},
    isClosed:{type:Boolean,required:false},
    isRead:{type:Boolean,required:false},
    user_id:{type:String,required:true},
    img:{type:String,required:false}
})



module.exports = mongoose.model('Post', PostSchema)
