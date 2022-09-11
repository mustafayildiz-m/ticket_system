const mongoose = require('mongoose')
const Post = require('./models/Post')
const hostname = '127.0.0.1'
const database = 'mongotickets_db_test'

mongoose.connect(`mongodb://${hostname}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Post.create({
//     title: "Mustafa",
//     content: 'Post içeriği',
// }, (error, post) => {
//     console.log(error, post)
// })

// Post.find({}, (error, post) => {
//     console.log(error, post)
// })
//
// Post.findByIdAndUpdate('631ccb2ebcccc524b1a70e82', {title: 'Hakan'}, (error, post) => {
//     console.log(error, post)
// })

// Post.deleteOne({
//     _id: '631ccb2ebcccc524b1a70e82'
// }, (err, data) => {
//     console.log(err, data)
// })

Post.find({}, (err, data) => {
    console.log(err,data)
})