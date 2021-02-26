var Request = require('../model/request.model');
var { Op } = require('sequelize');
const RequestAmmunition = require('../model/requestAmmo.model');
const RequestWeapon = require('../model/requestWeapon.model');
const AmmunitionType = require('../model/ammunitionType.model');
const WeaponModel = require('../model/weaponModel.model');
const Station = require('../model/station.model');
const { converter } = require('../utils/objectConverter');
const sequelize = require('../config/db');

exports.getRequests = async (req, res) => {
	let requests = [];
	try {
		requests = await Request.findAll({ where: { state: { [Op.ne]: 'Complete' } } , include:{model:Station}});
		return res.status(200).send( requests);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getRequestsStation = async (req, res) => {
	let requests = [];
	try {
		requests = await Request.findAll({ where: { stationID: req.params.stationID} });
		return res.status(200).send( requests);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};


exports.getRequest = async (req, res) => {
	let request = {};
	let ammoRequests = [];
	let weaponRequests = [];
	try {
        ammoRequests = await RequestAmmunition.findAll({where:{ requestID: req.params.requestID}, include:{model:AmmunitionType}})
        weaponRequests = await RequestWeapon.findAll({where:{  requestID: req.params.requestID}, include:{model:WeaponModel}})
		ammoRequests = ammoRequests.map(item => converter(item.dataValues))
		weaponRequests = weaponRequests.map(item => converter(item.dataValues))
		request.AmmunitionRequests = ammoRequests;
		request.WeaponRequests = weaponRequests
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.createRequest = async (req, res) => {
	let request = req.body;
	let result = request;
    let weaponRequests = [];
	let ammoRequests = [];
	let t = await sequelize.transaction() 
	try {
		result = await Request.create(request,{transaction:t});
		if (request.hasOwnProperty('WeaponRequests')) {
			if (request.WeaponRequests.length > 0) {
				request.WeaponRequests = request.WeaponRequests.map(item => {return {...item,requestID:result.requestID}})
				weaponRequests = await RequestWeapon.bulkCreate(request.WeaponRequests,{transaction:t});
			}
		}
		if (request.hasOwnProperty('AmmunitionRequests')) {
			if (request.AmmunitionRequests.length > 0) {
				request.AmmunitionRequests = request.AmmunitionRequests.map(item => {return {...item,requestID:result.requestID}})
				ammoRequests = await RequestAmmunition.bulkCreate(request.AmmunitionRequests,{transaction:t});
			}
		}
		await t.commit()
		result = result.dataValues
		result.WeaponRequests = weaponRequests;
		result.AmmunitionRequests = ammoRequests;
		return res.status(200).send( result);
	} catch (e) {
		await t.rollback();
		return res.status(400).send( e.message);
	}
};

exports.updateRequest = async (req, res) => {
    let request = req.body;
    let weaponRequests = [];
	let ammoRequests = [];
	let t = await sequelize.transaction();
	try {
		if (request.hasOwnProperty('AmmunitionRequests')) {
			ammoRequests = await RequestAmmunition.bulkCreate(request.AmmunitionRequests, {
				updateOnDuplicate: ['amount'], transaction:t
			});
		}
		if (request.hasOwnProperty('WeaponRequests')) {
			weaponRequests = await RequestWeapon.bulkCreate(request.WeaponRequests, {
				updateOnDuplicate: ['amount'],transaction:t
			});
        }
        request = await Request.update(
			{ ...req.body },
			{ where: { requestID: req.params.requestID }, returning: true ,transaction:t}
		);
		await t.commit()
		request = await Request.findOne({ where: { requestID: req.params.requestID } });
		request = request.dataValues;
        request.AmmunitionRequests = ammoRequests;
        request.WeaponRequests = weaponRequests;
		return res.status(200).send( request);
	} catch (e) {
		await t.rollback();
		return res.status(400).send( e.message);
	}
};

/**
 * @returns success or error message 
 */
exports.deleteRequest = async (req, res) => {
	try {
		await Request.destroy({ where: { requestID: req.params.requestID } });
		return res.status(200).send('Succesfully request deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Request cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};