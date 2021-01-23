var Request = require('../model/request.model');
var { Op } = require('sequelize');
const RequestAmmunition = require('../model/requestAmmo.model');
const RequestWeapon = require('../model/requestWeapon.model');
const AmmunitionType = require('../model/ammunitionType.model');
const WeaponModel = require('../model/weaponModel.model');
const { converter } = require('../services/objectConverter');

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
    request.ammoRequests = [];
    request.weaponRequests = [];
	try {
        request = await Request.findOne({ where: { requestID: req.params.requestID} });
        request.ammoRequests = await RequestAmmunition.findAll({where:{ requestID: req.params.requestID}})
        request.weaponRequests = await RequestWeapon.findAll({where:{ requestID: req.params.requestID}})
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};
exports.getRequestStation = async (req, res) => {
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
	try {
		result = await Request.create(request);
		if (request.hasOwnProperty('WeaponRequests')) {
			if (request.WeaponRequests.length > 0) {
				request.WeaponRequests = request.WeaponRequests.map(item => {return {...item,requestID:result.requestID}})
				weaponRequests = await RequestWeapon.bulkCreate(request.WeaponRequests);
			}
		}
		if (request.hasOwnProperty('AmmunitionRequests')) {
			if (request.AmmunitionRequests.length > 0) {
				request.AmmunitionRequests = request.AmmunitionRequests.map(item => {return {...item,requestID:result.requestID}})
				ammoRequests = await RequestAmmunition.bulkCreate(request.AmmunitionRequests);
			}
		}
		result = result.dataValues
		result.WeaponRequests = weaponRequests;
		result.AmmunitionRequests = ammoRequests;
		return res.status(200).send( result);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.updateRequest = async (req, res) => {
    let request = req.body;
    let weaponRequests = [];
    let ammoRequests = [];
	try {
		if (request.hasOwnProperty('AmmunitionRequests')) {
			ammoRequests = await RequestAmmunition.bulkCreate(request.AmmunitionRequests, {
				updateOnDuplicate: ['amount'],
			});
		}
		if (request.hasOwnProperty('WeaponRequests')) {
			weaponRequests = await RequestWeapon.bulkCreate(request.WeaponRequests, {
				updateOnDuplicate: ['amount'],
			});
        }
        request = await Request.update(
			{ ...req.body },
			{ where: { requestID: req.params.requestID }, returning: true }
		);
		request = await Request.findOne({ where: { requestID: req.params.requestID } });
		request = request.dataValues;
        request.AmmunitionRequests = ammoRequests;
        request.WeaponRequests = weaponRequests;
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

