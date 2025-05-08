const passport = require('passport');

const authenticate = (req,res,next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: err.message
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                error: info.message
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = {
    authenticate
}