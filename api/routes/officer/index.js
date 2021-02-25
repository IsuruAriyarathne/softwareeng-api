const routes = require('express').Router();
const { authorize } = require('../../middleware/authorize');
const { USER_TYPES_OBJ } = require('../../utils/constants');

routes.use(authorize(USER_TYPES_OBJ.officer));
routes.use('/recovery', require('./recovery'));
routes.use('/ammunitions', require('./ammunitions'));
routes.use('/weapons', require('./weapons'));
routes.use('/weaponModels', require('./weaponModel'));
routes.use('/ammoModels', require('./ammoModel'));
routes.use('/requests', require('./request'));
routes.use('/maintenance', require('./maintainanceRecord'));
routes.use('/maintainanceRecords', require('./maintainanceRecord'));

module.exports = routes;
