const express = require('express');
const MaintainanceRecordController = require('../../controlller/maintainanceRecords.controller')
const validateMaintainanceRecord = require('../../validator/maintainanceRecord.validator');
const router = express.Router();

/**
 * @description get all maintainance Records
 */
router.get('/', MaintainanceRecordController.getMaintainanceRecords);

/**
 * @description get weapons maintainance records
 */
router.get('/:weaponID', MaintainanceRecordController.getWeaponMaintainanceRecords);

/**
 * @description update maintainance record
 */
router.put('/:id', validateMaintainanceRecord, MaintainanceRecordController.updateMaintainanceRecord);

/**
 * @description create maintainance record
 */
router.post('/', validateMaintainanceRecord, MaintainanceRecordController.createMaintainanceRecord);


/**
 * @description delete maintainance record
 */
router.delete('/:id', MaintainanceRecordController.deleteMaintainanceRecord);


module.exports = router;
