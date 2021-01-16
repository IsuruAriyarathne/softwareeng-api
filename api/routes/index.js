var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../middleware/authenticate');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {
	passport.authenticate('local', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error('An error occurred.');
				return res.json({ success: false, status: 'Unauthorized!' });
			}

			var token = authenticate.getToken({ username: req.body.officerID });
			console.log(user);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			return res.json({ success: true, token: token, status: 'You are successfully logged in!',type: user.role ,stationID:user.stationID});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

passport.authenticate();

// router.post('/login', async (req, res, next) => {
// 	passport.authenticate('local',
// });

module.exports = router;
