var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user.model');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/config');
var bcrypt = require('bcrypt');

exports.local = passport.use(
	new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
		User.findOne({ where: { email: email } })
			.then((user) => {
				if (!user) {
					return done(null, false);
				} else {
					bcrypt.compare(password, user.password, function (err, result) {
						if (err) {
							return done(err, false);
						}
						else if (result) {
							return done(null, user.dataValues);
						}
						return done(null, false);
					});
				}
			})
			.catch((err) => done(err, false));
	})
);

exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		User.findOne({ where: { email: jwt_payload.email } })
			.then((user) => {
				if (!user) {
					done(null, false);
				} else {
					user = user.dataValues;
					return done(null, user);
				}
			})
			.catch((err) => done(err, false));
	})
);

exports.verifyUser = passport.authenticate('jwt', { session: false });
