const jwt = require('passport-jwt');
const User = require('../models/user');

const ExtractJwt = jwt.ExtractJwt;
const JwtStrategy = jwt.Strategy;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'twitter_secret'
};

const passportAuth = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    }));
}

module.exports = {
    passportAuth
}