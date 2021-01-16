const express = require("express");
const Recovery = require('../../model/recovery.model');
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject');
const Station = require("../../model/station.model");
const RecoveredAmmunition = require("../../model/recoveredAmmo.model");
const RecoveredWeapon = require("../../model/recoveredWeapon.model");

const router = express.Router();

router.get('/', (req,res) => {
    let findAll = Controller.findAll(Recovery);
    let where = DbObject.getWhereObject('stationID',req.body.stationID)
    let include = DbObject.getIncludeObject([Station, RecoveredAmmunition,RecoveredWeapon])
    console.log(include);
	findAll(where,[],include)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:recoveryID', (req, res) => {
	let findAll = Controller.findAll(Recovery);
	let obj = DbObject.getWhereObject('recoveryID', req.params.recoveryID);
	findAll(obj)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/::recoveryID', (req,res) => {
	let update = Controller.update(Recovery);
	let condition = DbObject.getWhereObject('recoveryID', req.params.recoveryID);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
	let create = Controller.create(Recovery);
	create(req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.delete('/:recoveryID', (req,res) => {
    let deleteEntry = Controller.delete(Recovery);
    let obj = DbObject.getDeleteObject('recoveryID',req.params.recoveryID)
	deleteEntry(obj)
		.then((result) => {
            if (result) res.send('Success');
            // res.send('Couldnt delete')
		})
		.catch((err) => res.send(err));
} )

module.exports = router;