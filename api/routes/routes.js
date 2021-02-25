const adminRouter = require('./admin')
const officerRouter = require('./officer')
const cenOfficerRouter = require('./centralizedOfficer')

module.exports = (app) => {
	app.use('/admin',adminRouter);
	app.use('/officer', officerRouter);
	app.use('/centralizedOfficer', cenOfficerRouter);
};
