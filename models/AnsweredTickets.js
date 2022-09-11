const mongoose = require('mongoose')

const AnsweredTicketssSchema = new mongoose.Schema({
    name: {type: String, require: true},
    ticket_id:{type:String,required:true},
    content: {type: String, require: true},
    date: {type: Date, require: Date.now()},
    img:{type:String,required:false}
})



module.exports = mongoose.model('AnsweredTickets', AnsweredTicketssSchema)
