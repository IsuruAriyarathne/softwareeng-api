var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');

passport.use(new LocalStrategy( (username,password, done) => {
    // User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //   });
    if(username=='admin' && password =='admin'){
        return done(null,{username,password})
    }
    else{
        return done (null,false)
    }
}
));

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);

        // User.findOne({_id: jwt_payload._id}, (err, user) => {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     else if (user) {
        //         return done(null, user);
        //     }
        //     else {
        //         return done(null, false);
        //     }
        // });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});