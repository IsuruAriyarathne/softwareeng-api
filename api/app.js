var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./middleware/authenticate');
const fs = require('fs')


var indexRouter = require('./routes/index');
  
require('./services/report')   // generates and sends the monthly report

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/',cors(), indexRouter);

// app.use(authenticate.verifyUser);
// Define all routes
app.use("/admin/stations", require("./routes/admin/stations"));
app.use("/admin/users",cors(), require("./routes/admin/users"));
app.use("/officer/recovery", require("./routes/officer/recovery"));
app.use("/officer/ammunitions", require("./routes/officer/ammunitions"));
app.use("/officer/weapons", require("./routes/officer/weapons"));
app.use("/officer/weaponModels", require("./routes/officer/weaponModel"));
app.use("/officer/ammoModels", require("./routes/officer/ammoModel"));
app.use("/officer/requests", require("./routes/officer/request"));
app.use("/officer/maintenance", require("./routes/officer/maintainanceRecord"));
app.use("/officer/maintainanceRecords", require("./routes/officer/maintainanceRecord"));
app.use("/centralizedOfficer/companies", require("./routes/centralizedOfficer/companies"));
app.use("/centralizedOfficer/stations", require("./routes/centralizedOfficer/station"));
app.use("/centralizedOfficer/ammunitions", require("./routes/centralizedOfficer/ammunitions"));
app.use("/centralizedOfficer/orders", require("./routes/centralizedOfficer/order"));
app.use("/centralizedOfficer/weapons", require("./routes/centralizedOfficer/weapons"));
app.use("/centralizedOfficer/weaponModels", require("./routes/centralizedOfficer/weaponModel"));
app.use("/centralizedOfficer/ammoModels", require("./routes/centralizedOfficer/ammoModel"));
app.use("/centralizedOfficer/recovery", require("./routes/centralizedOfficer/recovery"));
app.use("/centralizedOfficer/requests", require("./routes/centralizedOfficer/request"));
app.use("/centralizedOfficer/maintainanceRecords", require("./routes/centralizedOfficer/maintainanceRecord"));

app.use(cors())

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  console.log(err.message);
  res.status(err.status || 500);
});

module.exports = app;
