const routes = require('express').Router();
const {authorize} = require('../../middleware/authorize')
const {USER_TYPES_OBJ} = require('../../utils/constants')

routes.use(authorize(USER_TYPES_OBJ.admin))
  
routes.use('/stations', require('./stations'));
routes.use('/users', require('./users'));


module.exports = routes;