import express from 'express';
import SessionModel from '../../model/session';
import { AuthController } from './auth.controller';
import { validateLogin } from './validator/login.validator';

const router = express.Router();

// Auth page
router.get('/login' , (req, res) => {
    return res.render('pages/login.pug')
})

router.get('/register', (req, res) => {
    return res.render('pages/register.pug')
})

/**
 * Check if user exist and password matched
 * Fetch it out
 * Check the session with userId -> if not createOne
 * If have -> check lock -> not login
 * If not lock -> expired -> delete the old and create new
 */
router.post('/login', validateLogin, AuthController.login)

router.post('/register', AuthController.register)

router.get('/logout', async (req, res) => {
    console.log("Im logging out");
    
    const { sessionId } = req.signedCookies;
    console.log(sessionId);
    
    if (sessionId) {
        await SessionModel.deleteOne({
            _id: sessionId
        })
        return res.status(203).json({});
    }
    return res.status(400).json({
        message: 'Can not logout'
    });
})

export default router;