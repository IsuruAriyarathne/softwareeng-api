var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/authenticate');

/**
 * @description login
 */
router.post('/', async (req, res,next) => {
	passport.authenticate('local', async (err, user, info) => {
		try {
			if (err || !user) {
				return res.status(200).send({ success: false, status: 'Unauthorized!' });
			}

			var token = authenticate.getToken({ email: user.email, role: user.role});
			let success = true;
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			return res.status(200).send({ success: success, token: token, type: user.role, stationID: user.stationID });
		} catch (error) {
			return res.status(400).send({ success: false, status: 'Server error!' });
		}
	})(req, res);
});

passport.authenticate();

// router.post('/login', async (req, res, next) => {
// 	passport.authenticate('local',
// });

module.exports = router;
