import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../model/user';
import SessionModel from '../../model/session';
import { envConfig } from '../../env';
const router = express.Router();

// Auth page
router.get('/login' , (req, res) => {
    return res.render('pages/login.pug')
})

/**
 * Check if user exist and password matched
 * Fetch it out
 * Check the session with userId -> if not createOne
 * If have -> check lock -> not login
 * If not lock -> expired -> delete the old and create new
 */
router.post('/login', async (req, res) => {
    let sessionId;
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

    const userInfomation = {
        _id: user._id,
        username: user.username
    }
    console.log("======Current session ============");
    console.log(currentUserSession);

    if (!currentUserSession) {
        console.log('New session');
        
        const session = await SessionModel.create({
            user: userInfomation,
            lock: true,
            expired: Date.now() + envConfig.get('SESSION_EXPIRED')
        });
        sessionId = session._id;
    } else {
        if (currentUserSession.lock) {
            return res.render('pages/error', {
                error: 'You can not log in now. Your account is being used'
            })
        }
        if (Date.now() - currentUserSession.expired > 0) {
            await SessionModel.deleteOne({
                'user._id': user._id 
            })
            const session = await SessionModel.create({
                user: userInfomation,
                lock: true
            });
            sessionId = session._id;
        }
    }

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 30 * 1000
    });
    return res.redirect('/');
})

export default router;