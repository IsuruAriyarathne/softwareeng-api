var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./middleware/authenticate');
var indexRouter = require('./routes/index');

require('./services/report');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use(cors());

app.use('/', indexRouter);

app.use(authenticate.verifyUser);

require('./routes/routes')(app);

app.use((req, res, next) => {
	res.status(404).send({
		status: 404,
		error: 'Not found',
	});
});

module.exports = app;
