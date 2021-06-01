const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../../model/user');
const SessionModel = require('../../model/session');
const router = express.Router();

// Auth page
router.get('/login' , (req, res) => {
    return res.render('pages/login.pug')
})

router.post('/login', async (req, res) => {
    const user = await UserModel.findOne({
        username: req.body.email
    });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.render('pages/error.pug', {
            error: `Email not found to login`
        });
    }

    const currentUserSession = await SessionModel.findOne({
        'user._id': user._id
    });

    if (currentUserSession?.lock) {
        return res.render('pages/error', {
            error: 'Have some user using this account'
        })
    }

    const userInfomation = {
        _id: user._id,
        username: user.username
    }

    console.log(userInfomation);

    const session = await SessionModel.create({
        user: userInfomation,
        lock: true
    });

    console.log(session);

    res.cookie('user', session._id, {
        httpOnly: true,
        signed: true,
        maxAge: 30 * 1000
    });
    return res.redirect('/');
})

module.exports = router;