const routes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const { USER_TYPES_OBJ } = require('../../utils/constants');

routes.use(authorize(USER_TYPES_OBJ.cenofficer));

routes.use('/companies', require('./companies'));
routes.use('/stations', require('./station'));
routes.use('/ammunitions', require('./ammunitions'));
routes.use('/orders', require('./order'));
routes.use('/weapons', require('./weapons'));
routes.use('/weaponModels', require('./weaponModel'));
routes.use('/ammoModels', require('./ammoModel'));
routes.use('/recovery', require('./recovery'));
routes.use('/requests', require('./request'));
routes.use('/maintainanceRecords', require('./maintainanceRecord'));

module.exports = routes;
