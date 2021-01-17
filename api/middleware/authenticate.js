var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user.model')
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');

exports.local = passport.use(new LocalStrategy( {usernameField:"officerID", passwordField:"password" },(officerID,password, done) => {
    User.findOne({officerID:officerID})
        .then(user => {
            if(!user){
                return done(null,false)
            }
            else if(user[0].password == password){
                return done(null,user[0].dataValues);
            }
            else{
                return done(null,false)
            }
        })
        .catch(err => done(err,false))
}
));

exports.getToken = (user)  => {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({officerID:jwt_payload.username})
        .then(user => {
            console.log(user);
            if(!user[0]){
                done(null,false)
            }
            else if(user[0]){
                return done(null,user[0]);
            }
        })
        .catch(err => done(err,false))
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
