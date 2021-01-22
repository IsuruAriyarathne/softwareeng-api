const express = require("express");
const StationController = require('../../controlller/station.controller'); 
// const {validateStationSchema} = require('../../validator/station.validator'); 
const router = express.Router();

router.get('/', StationController.getStations)

router.get('/:stationId', StationController.geStation);

router.put('/:stationId', StationController.updateStation )

router.post('/', StationController.createStation)

router.delete('/:stationId', StationController.deleteStation)

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});
module.exports = router;