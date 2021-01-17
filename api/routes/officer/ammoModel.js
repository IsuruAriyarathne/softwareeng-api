const express = require("express");
const Controller = require('../../controlller/controller');
const DbObject = require('../../controlller/dbObject'); 
const AmmunitionType = require("../../model/ammunitionType.model");

const router = express.Router();

router.get('/', (req,res) => {
	let findAll = Controller.findAll(AmmunitionType);
	findAll({})
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
} )

router.get('/:ammoId', (req, res) => {
	res.send('Unauthorized');
});

router.put('/:ammoId', (req,res) => {
	res.send('Unauthorized')

} )

router.post('/', (req,res) => {

	res.send('Unauthorized')
})
router.delete('/', (req,res) => {
	res.send('Unauthorized');
} )

router.delete('/:ammoId', (req,res) => {
	res.send('Unauthorized');
} )

module.exports = router;