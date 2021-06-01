const express = require('express');
const bcrypt = require('bcrypt');

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

    const userInfomation = {
        id: user._id,
        username: user.username
    }

    // , {
    //     maxAge: 900000, 
    //     httpOnly: true,
    //     signed: true,
    // }
    res.cookie('user', userInfomation, {
        httpOnly: true,
        signed: true,
    });
    return res.redirect('/');
})

module.exports = router;