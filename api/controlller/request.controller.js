var Request = require('../model/request.model');
var { Op } = require('sequelize');
const RequestAmmunition = require('../model/requestAmmo.model');
const RequestWeapon = require('../model/requestWeapon.model');

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
	request.ammoRequests = [];
	request.weaponRequests = [];
	try {
        request = await Request.findAll({ where: { stationID: req.params.stationID, requestID: req.params.requestID} });
        request.ammoRequests = await RequestAmmunition.findAll({where:{ stationID: req.params.stationID,requestID: req.params.requestID}})
        request.weaponRequests = await RequestWeapon.findAll({where:{ stationID: req.params.stationID, requestID: req.params.requestID}})
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.createRequest = async (req, res) => {
    let request = req.body;
    let weaponRequests = [];
    let ammoRequests = [];
	try {
		if (request.hasOwnProperty('weaponRequests')) {
			if (request.weaponRequests.length > 0) {
				weaponRequests = await RequestWeapon.bulkCreate(request.weaponRequests);
			}
		}
		if (request.hasOwnProperty('ammoRequests')) {
			if (request.ammoRequests.length > 0) {
				ammoRequests = await RequestAmmunition.bulkCreate(request.ammoRequests);
			}
		}
		request = await request.create(request);
		request.weaponRequests = weaponRequests;
		request.ammoRequests = ammoRequests;
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.updateRequest = async (req, res) => {
    let request = {};
    let weaponRequests = [];
    let ammoRequests = [];
	try {
		if (request.hasOwnProperty('ammoRequests')) {
			ammoRequests = await RecoveredAmmunition.bulkCreate(order.ammoOrder, {
				updateOnDuplicate: ['amount'],
			});
		}
		if (request.hasOwnProperty('weaponRequests')) {
			weaponRequests = await RecoveredAmmunition.bulkCreate(order.ammoOrder, {
				updateOnDuplicate: ['amount'],
			});
        }
        request = await Request.update(
			{ ...req.body },
			{ where: { requestID: req.params.requestID }, returning: true }
		);
        request = await Request.findOne({ where: { requestID: req.params.requestID } });
        request.ammoRequests = ammoRequests;
        request.weaponRequests = weaponRequests;
		return res.status(200).send( request);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

