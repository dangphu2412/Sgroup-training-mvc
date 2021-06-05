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
            expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
            renewTime: Date.now() + envConfig.get('SESSION_RENEW')
        });
        sessionId = session._id;
    } else {
        if (Date.now() - currentUserSession.expired > 0 || Date.now() - currentUserSession.renewTime) {
            await SessionModel.deleteOne({
                'user._id': user._id 
            })
            console.log(`Deleting session with user id: ${user._id}`);
            
            const session = await SessionModel.create({
                user: userInfomation,
                expired: Date.now() + envConfig.get('SESSION_EXPIRED'),
                renewTime: Date.now() + envConfig.get('SESSION_RENEW')
            });
            sessionId = session._id;
        } else {
            return res.redirect('/auth/login');
        }
    }

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: Date.now() + Number.parseInt(envConfig.get('SESSION_EXPIRED'))
    });
    return res.redirect('/');
})

router.delete('/logout', async (req, res) => {
    const { sessionId } = req.signedCookies;
    await SessionModel.deleteOne({
        _id: sessionId
    })
    return res.status(203);
})

export default router;