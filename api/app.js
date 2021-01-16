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
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testapi');

const {sendMail} = require('./middleware/reportSender');
var cron = require('node-cron');

cron.schedule('* * * * *', () => {           // This is currently set to function every minute, change that to ever 30th day of the month
    /* 

    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *

    */

    let reportBody = ''

    const stations = [{stationID: 1, stationName: 'Saliyapura'}, {stationID: 2, stationName: 'Boosa'}] // should be generated using the database

    stations.forEach((station) => {

      const weapons = [{weaponID: 1, weaponModel: 'T-56'}, {weaponID: 2, weaponModel: 'Sniper'}]  // should be generated using the database
      const ammunition = [{ammoModelID: 1, ammoModel: '7.6mm'}, {ammoModelID: 2, ammoModel: '.300 Magnum Ammo'}]  // should be generated using the database
      const recoveredWeapons = [{weaponID: 1, weaponModel: 'T-56'}, {weaponID: 2, weaponModel: 'Sniper'}]  // should be generated using the database
      const recoverdAammunition = [{ammoModelID: 1, ammoModel: '7.6mm'}, {ammoModelID: 2, ammoModel: '.300 Magnum Ammo'}]  // should be generated using the database

      reportBody += (`Station :${station.stationName}\\n`)
      
      reportBody += 'Weapons\n'
      weapons.forEach((weapon) => {
        const count= 5  // should be generated using the database
        reportBody += (`${weapon.weaponModel} - ${count} units\n`)
      })

      reportBody += 'Ammunition\n'
      ammunition.forEach((ammo) => {
        const count= 40000  // should be generated using the database
        reportBody += (`${ammo.ammoModel} - ${count} bullets\n`)
      })

      reportBody += 'Recovered Weapons\n'
      recoveredWeapons.forEach((weapon) => {
        const count= 5  // should be generated using the database
        reportBody += (`${weapon.weaponModel} - ${count} units\n`)
      })

      reportBody += 'Recovered Ammunition\n'
      recoverdAammunition.forEach((ammo) => {
        const count= 40000  // should be generated using the database
        reportBody += (`${ammo.ammoModel} - ${count} bullets\n`)
      })

      reportBody += '\n'
    })

    const stockWeapons = [{weaponID: 1, weaponModel: 'T-56', count: 500}, {weaponID: 2, weaponModel: 'Sniper', count:20}]  // should be generated using the database
    const stockammunition = [{ammoModelID: 1, ammoModel: '7.6mm', count: 250000}, {ammoModelID: 2, ammoModel: '.300 Magnum Ammo', count: 1000}]  // should be generated using the database

    reportBody += 'Stock Weapons\n'
    stockWeapons.forEach((weapon) => {
      reportBody += `${weapon.weaponModel} - ${weapon.count}\n`
    })

    reportBody += 'Stock Ammunition\n'
    stockammunition.forEach((ammo) => {
      reportBody += `${ammo.ammoModel} - ${ammo.count}`
    })

    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const reportSubject = `Monthly Report: ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`

    sendMail(reportSubject, Buffer.from(reportBody));
});   


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

app.use(authenticate.verifyUser);
app.use('/testapi',testAPIRouter)

// Define all routes
app.use("/admin/stations", require("./routes/admin/stations"));
app.use("/admin/users",cors(), require("./routes/admin/users"));
app.use("/officer/recovery", require("./routes/officer/recovery"));
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
