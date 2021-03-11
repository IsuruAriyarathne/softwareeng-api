const express = require("express");
const StationController = require('../../controlller/station.controller');
const router = express.Router();

/**
 * @description get all stations
 */
router.get('/', StationController.getStations)


module.exports = router;