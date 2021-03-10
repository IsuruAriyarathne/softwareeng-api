const express = require("express");
const StationController = require('../../controlller/station.controller'); 
const validateStation = require('../../validator/station.validator'); 
const router = express.Router();

/**
 * @description get all stations
 */
router.get('/', StationController.getStations)

/**
 * @description get station
 */
router.get('/:stationId', StationController.getStation);

/**
 * @description update stations
 */
router.put('/:stationId',validateStation,StationController.updateStation )

/**
 * @description add station
 */
router.post('/', validateStation,StationController.createStation)

/**
 * @description delete station
 */
router.delete('/:stationId', StationController.deleteStation)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});
module.exports = router;