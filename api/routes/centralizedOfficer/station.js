const express = require("express");
const StationController = require('../../controlller/station.controller');
const router = express.Router();

/**
 * @description get all stations
 */
router.get('/', StationController.getStations)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:stationId', )

module.exports = router;