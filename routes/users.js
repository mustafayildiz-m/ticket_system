const express = require('express')
const router = express.Router();
const User = require('../models/User')

router.get('/register', (req, res) => {
    try {
        res.render('pages/register');

    } catch (e) {
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try {
        var hasUser = false
        await User.findOne({email: req.body.user_email}, (err, user) => {
            console.log(user)
            if (user !== null) {
                hasUser = true
            }
        })
        req.body.hasUser = hasUser

        if (req.body.password_one !== req.body.password_two) {
            res.render('pages/register', {
                err: "Şifreler Uyumsuz"
            })

        } else if (req.body.hasUser === true) {
            res.render('pages/register', {
                err: "Bu email Daha önceden kayıt edilmiş"
            })
        } else if (req.body.password_one.length === 0 || req.body.password_two.length === 0) {
            res.render('pages/register', {
                err: "Şifre alanlarını Doldurunuz"
            })
        } else {

            res.render('pages/register', {
                err: "Kayıt Başarılı"
            })
            let data = {
                name: req.body.user_name,
                email: req.body.user_email,
                password: req.body.password_one,
                role: 0
            }
            User.create(data, (err, user) => {
                res.redirect('/users/login')
            })

        }

    } catch (e) {
        console.log(e)
    }
})

router.get('/login', (req, res) => {
    try {
        res.render('pages/login');

    } catch (e) {
        console.log(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        let data = {
            email: req.body.user_email,
            password: req.body.user_password
        }
        let isUser = false
        await User.findOne(data, (err, user) => {
            if (user !== null) {
                isUser = true
            }
        })

        switch (isUser) {
            case true:
                //USER SESSİON
                User.findOne({'email': req.body.user_email}, (err, user) => {
                    req.session.userId = user._id
                    req.session.userName = user.name
                    req.session.isLogin = true

                    req.session.isAdmin = false
                    req.session.isUser = false

                    if (user.role === '0') {
                        req.session.isUser = true

                        let data = {
                            id: req.session.userId,
                            username: req.session.userName,
                            admin: req.session.isAdmin,
                            user: req.session.isUser
                        }
                        res.render('pages/index', data)

                    } else if (user.role === '1') {
                        req.session.isAdmin = true
                        let data = {
                            id: req.session.userId,
                            username: req.session.userName,
                            admin: req.session.isAdmin,
                            user: req.session.isUser
                        }
                        console.log(data)

                        res.render('pages/index', data)
                    }

                })


                break;
            case false:
                req.session.isLogin = false
                res.render('pages/login', {
                    err: "Mail yada Şifre Hatalı"
                })


        }


    } catch (e) {
        console.log(e)
    }

})
router.get('/logout', (req, res) => {
    req.session.isLogin = false
    req.session.admin = false
    req.session.user = false
    try {
        res.render('pages/login')

    } catch (e) {
        console.log(e)
    }
})
module.exports = router