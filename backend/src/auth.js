const db = require('./db');

module.exports = {
    secret: process.env.COOKIE_SECRET || 'secret',

    resolveUser: async (req, res, next) => {
        if (req.signedCookies && req.signedCookies.token) {
            const user = await db.users.getUserByToken(req.signedCookies.token);
            if (user) {
                req.user = user;
                res.set('isAuthenticated', 1);
            }
            next();
        } else {
            next();
        }
    },

    requireAuth: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.sendStatus(401);
        }
    },
};
