const { log } = require('debug');
const {authorize} = require('../middleware/authorize');

module.exports = (app) => {
	app.use('/admin/stations', require('./admin/stations'));
	app.use('/admin/users', require('./admin/users'));
	app.use('/officer/recovery', require('./officer/recovery'));
	app.use('/officer/ammunitions', require('./officer/ammunitions'));
	app.use('/officer/weapons', require('./officer/weapons'));
	app.use('/officer/weaponModels', require('./officer/weaponModel'));
	app.use('/officer/ammoModels', require('./officer/ammoModel'));
	app.use('/officer/requests', require('./officer/request'));
	app.use('/officer/maintenance', require('./officer/maintainanceRecord'));
	app.use('/officer/maintainanceRecords', require('./officer/maintainanceRecord'));
	app.use('/centralizedOfficer/companies', require('./centralizedOfficer/companies'));
	app.use('/centralizedOfficer/stations', require('./centralizedOfficer/station'));
	app.use('/centralizedOfficer/ammunitions', require('./centralizedOfficer/ammunitions'));
	app.use('/centralizedOfficer/orders', require('./centralizedOfficer/order'));
	app.use('/centralizedOfficer/weapons', require('./centralizedOfficer/weapons'));
	app.use('/centralizedOfficer/weaponModels', require('./centralizedOfficer/weaponModel'));
	app.use('/centralizedOfficer/ammoModels', require('./centralizedOfficer/ammoModel'));
	app.use('/centralizedOfficer/recovery', require('./centralizedOfficer/recovery'));
	app.use('/centralizedOfficer/requests', require('./centralizedOfficer/request'));
	app.use('/centralizedOfficer/maintainanceRecords', require('./centralizedOfficer/maintainanceRecord'));
};
