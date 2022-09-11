const express = require('express')
const router = express.Router();
const Post = require('../models/Post')


router.get('/', (req, res) => {
    if (req.session.isLogin) {
        try {
            let data = {
                id: req.session.userId,
                username: req.session.userName,
                name: req.session.name,
                admin: req.session.isAdmin,
                user: req.session.isUser
            }
            res.render('pages/index', data);

        } catch (e) {
            console.log(e)
        }
    } else {
        res.render('pages/login');

    }

})


router.get('/ticket/create', (req, res) => {
    try {
        let data = {
            id: req.session.userId,
            username: req.session.userName,
            name: req.session.name,
            admin: req.session.isAdmin,
            user: req.session.isUser
        }
        res.render('pages/createTicket', data);
    } catch (e) {
        console.log(e)
    }
})

router.get('/ticket/list', async (req, res) => {
    if (req.session.isUser) {
        try {
            await Post.find({user_id: req.session.userId}).lean().then(tickets => {
                let data = {
                    id: req.session.userId,
                    username: req.session.userName,
                    name: req.session.name,
                    admin: req.session.isAdmin,
                    user: req.session.isUser,
                    tickets: tickets
                }
                res.render('pages/listTicketsForUser', data)
            })


        } catch (e) {
            console.log(e)
        }
    } else {
        res.render('pages/index');

    }


})

router.get('/ticket/delete/:id', (req, res) => {
    try {
        Post.findOneAndDelete({_id: req.params.id}, (err, data) => {
            err ? console.log(err) : console.log(data)
        }).then(res1 => {

            res.redirect('/ticket/list')
        })
    } catch (e) {
        console.log(e)
    }

})

router.get('/ticket/show-tickets', async (req, res) => {
    if (req.session.isAdmin) {

        try {

            await Post.find().lean().then(tickets => {
                let data = {
                    tickets: tickets,
                    id: req.session.userId,
                    username_: req.session.userName,
                    admin: req.session.isAdmin,
                    user: req.session.isUser,
                }
                console.log(data)
                res.render('pages/showTickets', data)
            })

        } catch (e) {
            console.log(e)
        }


    } else {
        let data = {
            id: req.session.userId,
            username: req.session.userName,
            name: req.session.name,
            admin: req.session.isAdmin,
            user: req.session.isUser
        }
        res.render('pages/index', data);

    }

})

module.exports = router;