const express = require('express')
const router = express.Router();
const Post = require('../models/AnsweredTickets')
const path = require("path");


router.post('/answer-ticket/:ticket_id', (req, res) => {
    try {
        let obj = {
            ...req.body,
            ticket_id: req.params.ticket_id,
            date: Date.now(),
        }
        if (req.files !== null) {
            let img = req.files.post_image
            img.mv(path.resolve(__dirname, '../public/img/posted_images/', img.name))
            obj.img = '/img/posted_images/' + img.name
        } else {
            obj.img = '/img/posted_images/resim-yok.jpg'
        }

        Post.create(obj)
        res.redirect('/ticket/show-tickets')
    } catch (e) {
        console.log(e)
    }

})


module.exports = router;