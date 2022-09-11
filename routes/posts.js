const express = require('express')
const router = express.Router();
const Post = require('../models/Post');
const path = require('path')

router.post('/create-ticket', (req, res) => {
    try {
        let obj = {
            ...req.body,
            date: Date.now(),
            isAnswered: false,
            isClosed: false,
            isRead: false,
            user_id: req.session.userId
        }
        if (req.files !== null) {
            let img = req.files.post_image
            img.mv(path.resolve(__dirname, '../public/img/posted_images/', img.name))
            obj.img = '/img/posted_images/' + img.name
        } else {
            obj.img = '/img/posted_images/resim-yok.jpg'
        }


        Post.create(obj)
        res.redirect('/ticket/list')
    } catch (e) {
        console.log(e)
    }

})
router.post('/update-ticket/:id', (req, res) => {
    try {
        let obj = {
            ...req.body,
            date: Date.now(),

        }

        if (req.files !== null) {
            let img = req.files.post_image
            img.mv(path.resolve(__dirname, '../public/img/posted_images/', img.name))
            obj.img = '/img/posted_images/' + img.name
        } else {
            obj.img = req.body.img_old
        }

        Post.findByIdAndUpdate(req.params.id, obj, (err, data) => {
            res.redirect('/ticket/list')
        })


    } catch (e) {
        console.log(e)
    }

})
router.get('/readed-ticked/:ticket_id', (req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.ticket_id, {isRead: true}, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/ticket/show-tickets')
        });
    } catch (e) {
        console.log(e)
    }
})
router.get('/closed-ticket/:ticket_id', (req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.ticket_id, {isClosed: true}, function (err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/ticket/show-tickets')

        });
    } catch (e) {
        console.log(e)
    }
})
router.post('/answer-ticket/:ticket_id', (req, res) => {


    // try {
    //     let obj = {
    //         ...req.body,
    //         date: Date.now(),
    //         isAnswered: false,
    //         isClosed: false,
    //         isRead: false,
    //         user_id: req.session.userId
    //     }
    //     if (req.files !== null) {
    //         let img = req.files.post_image
    //         img.mv(path.resolve(__dirname, '../public/img/posted_images/', img.name))
    //         obj.img = '/img/posted_images/' + img.name
    //     } else {
    //         obj.img = '/img/posted_images/resim-yok.jpg'
    //     }
    //
    //
    //     Post.create(obj)
    //     res.redirect('/ticket/list')
    // } catch (e) {
    //     console.log(e)
    // }

})


module.exports = router