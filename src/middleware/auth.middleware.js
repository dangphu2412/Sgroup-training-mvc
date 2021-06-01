const SessionModel = require("../model/session");

module.exports = {
    async authRequired(req, res, next) {
        const { user: sessionId } = req.signedCookies;
        console.log(sessionId);

        if (!sessionId) return res.redirect('/auth/login');

        const session = await SessionModel.findById(sessionId);

        if (session.lock) return res.redirect('/auth/login');

        return next();
    },
    authNotRequired(req, res, next) {
        const { user } = req.signedCookies;

        if (user) return res.redirect('/');

        return next();
    },
    // auth(type) {
    //     return (req, res, next) => {
    //         const { user } = req.signedCookies;
    //         switch(type) {
    //             case 'REQUIRED':
    //                 if (!user) return res.redirect('/auth/login');
    //             case 'NOT_REQUIRED':
    //                 if (user) return res.redirect('/');
    //         }

    //         return next();
    //     }
    // }
}