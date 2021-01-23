const express = require('express');
const MaintainanceRecordController = require('../../controlller/maintainanceRecords.controller')
const router = express.Router();

/**
 * @description get weapons maintainance records
 */
router.get('/:stationID', MaintainanceRecordController.getStationMaintainanceRecords);

/**
 * @description update maintainance record
 */
router.put('/:id', MaintainanceRecordController.updateMaintainanceRecord);

/**
 * @description create maintainance record
 */
router.post('/', MaintainanceRecordController.createMaintainanceRecord);


/**
 * @description delete maintainance record
 */
router.delete('/:id', MaintainanceRecordController.deleteMaintainanceRecord);

router.all('*', (req, res) => {
	res.status(404).json({ status: 404, message: 'Not found' });
});

module.exports = router;
