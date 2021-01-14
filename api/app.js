var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testapi',testAPIRouter)

// Define all routes
app.use("/admin/stations", require("./routes/admin/stations"));
app.use("/admin/users",cors(), require("./routes/admin/users"));
app.use("/officer/ammunitions", require("./routes/officer/ammunitions"));
app.use("/officer/criminalammunitions", require("./routes/officer/criminalammunitions"));
app.use("/officer/criminalweapons", require("./routes/officer/criminalweapons"));
app.use("/officer/weapons", require("./routes/officer/weapons"));
app.use("/centralizedOfficer/companies", require("./routes/centralizedOfficer/companies"));
app.use(cors())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
