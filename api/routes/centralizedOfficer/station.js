const express = require("express");
const StationController = require('../../controlller/station.controller');
const router = express.Router();

router.get('/', StationController.getStations)

router.get('/:stationId', StationController.geStation);

router.put('/:stationId', StationController.updateStation )

router.post('/', StationController.createStation)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

// router.delete('/:stationId', )

module.exports = router;