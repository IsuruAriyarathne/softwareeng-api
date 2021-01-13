var express = require('express');
var users = require('../config/db');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users)
  res.send('API is working');
});

module.exports = router;
