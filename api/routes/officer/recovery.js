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
    let include = DbObject.getIncludeObject([RecoveredAmmunition,RecoveredWeapon])
    console.log(include);
	findAll({where: where,include:include})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:recoveryID', (req, res) => {
	let findAll = Controller.findAll(Recovery);
	let where = DbObject.getWhereObject('recoveryID', req.params.recoveryID);
	findAll({where:where})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
});

router.put('/:recoveryID', (req,res) => {
	let update = Controller.update(Recovery);
	let condition = DbObject.getWhereObject('recoveryID', req.params.recoveryID);
	update(condition, req.body)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.post('/', (req,res) => {
    let returnObj = {}
    let error = false
    console.log(req.body.recovery);
    console.log(req.body.recoveryAmmunition);
    console.log(req.body.recoveryWeapon);
	let createRecovery = Controller.create(Recovery);
	let createWeaponRecovery = Controller.bulkCreate(RecoveredWeapon);
	let createAmmunitionRecovery = Controller.bulkCreate(RecoveredAmmunition);
	createRecovery(req.body.recovery)
		.then((data) => {
            returnObj['recovery'] = data
        })
        .catch((err)=> {
            error =true
            res.send(err)
        })
    if(!error){
        createWeaponRecovery(req.body.recoveryWeapon)
		.then((data) => {
            returnObj['recoveryWeapon'] = data
        })
        .catch((err)=> {
            error =true
            res.send(err)
        })
    }
    if(!error){
        createAmmunitionRecovery(req.body.recoveryAmmunition)
		.then((data) => {
            returnObj['recoveryAmmunition'] = data
        })
        .catch((err)=> {
            error =true
            res.send(err)
        })
    }
    if(!error){
        res.send(returnObj)
    }
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