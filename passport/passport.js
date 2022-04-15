var passport = require('passport');
const User = require('../models/user.model');
const JWTStrategy = require("passport-jwt").Strategy;

passport.use(
    new JWTStrategy(options, async function(jwtPayload, done) {
        await User.findById({ _id:  jwtPayload.id })
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return  done(null, jwtPayload.id);
        })
        .catch(err => done(err));
    })
)
module.exports = passport;