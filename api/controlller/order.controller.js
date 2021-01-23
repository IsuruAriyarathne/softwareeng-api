const sequelize = require('../config/db');
const AmmunitionBatch = require('../model/ammunitionBatch.model');
const AmmunitionOrder = require('../model/ammunitionOrder.model');
const AmmunitionType = require('../model/ammunitionType.model');
const Order = require('../model/order.model');
const Supplier = require('../model/supplier.model');
const Weapon = require('../model/weapon.model');
const WeaponModel = require('../model/weaponModel.model');
const WeaponOrder = require('../model/weaponOrder.model');
const { converter } = require('../services/objectConverter');

exports.getOrders = async (req, res) => {
	let orders = [];
	try {
		orders = await Order.findAll({
			include: {
				model: Supplier,
			},
		});
		orders = orders.map((item) => converter(item.dataValues));
		return res.status(200).send(orders);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.getOrder = async (req, res) => {
	let order = {};
	let ammoOrder = [];
	let weaponOrder = [];
	try {
		ammoOrder = await AmmunitionOrder.findAll({
			where: { orderID: req.params.orderID },
			include: {
				model: AmmunitionType,
			},
		});
		weaponOrder = await WeaponOrder.findAll({
			where: {
				orderID: req.params.orderID,
			},
			include: {
				model: WeaponModel,
			},
		});
		ammoOrder = ammoOrder.map((item) => converter(item.dataValues));
		weaponOrder = weaponOrder.map((item) => converter(item.dataValues));
		order.AmmoOrder = ammoOrder;
		order.WeaponOrder = weaponOrder;
		return res.status(200).send(order);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

exports.createOrder = async (req, res) => {
	let order = req.body;
	let result = {};
	result.ammoOrder = [];
    result.weaponOrder = [];
    let t  = await sequelize.transaction();
	try {
		order = await Order.create(req.body,{transaction:t});
		result = order.dataValues;
		if (req.body.hasOwnProperty('AmmoOrder')) {
			    req.body.AmmoOrder = req.body.AmmoOrder.map((item) => {
				return { ...item, orderID: result.orderID };
			});
			result.AmmoOrder = await AmmunitionOrder.bulkCreate(req.body.AmmoOrder,{transaction:t});
		}

		if (req.body.hasOwnProperty('WeaponOrder')) {
			    req.body.WeaponOrder = req.body.WeaponOrder.map((item) => {
				return { ...item, orderID: result.orderID };
			});
			result.WeaponOrder = await WeaponOrder.bulkCreate(req.body.WeaponOrder,{transaction:t});
		}
        await t.commit();
		return res.status(200).send(result);
	} catch (e) {
        await t.rollback();
		return res.status(400).send(e.message);
	}
};

exports.updateOrder = async (req, res) => {
	let order = req.body;
	let ammos = [];
	let weapons = [];
    let t = await sequelize.transaction();
	try {
		if (order.hasOwnProperty('AmmoOrder')) {
			ammos = await AmmunitionOrder.bulkCreate(order.AmmoOrder, { updateOnDuplicate: ['count'] ,transaction:t});
		}

		if (order.hasOwnProperty('WeaponOrder')) {
			weapons = await WeaponOrder.bulkCreate(order.WeaponOrder, { updateOnDuplicate: ['count'] , transaction:t});
		}
		order = await Order.update(
			{ ...req.body },
			{
				where: {
					orderID: req.params.orderID,
                },
                transaction:t
			}
        );
        await t.commit();
		order = await Order.findOne({
			where: { orderID: req.params.orderID },
		});
		order = order.dataValues;
		order.AmmoOrder = ammos;
		order.WeaponOrder = weapons;

		return res.status(200).send(order);
	} catch (e) {
        await t.rollback();
		return res.status(400).send(e.message);
	}
};

exports.completeOrder = async (req, res) => {
	let ammunitionOrders = [];
	let weaponOrders = [];
	let bulkWeapons = [];
    let t = await sequelize.transaction();
	try {
		ammunitionOrders = await AmmunitionOrder.findAll({ where: { orderID: req.params.orderID } });
		weaponOrders = await WeaponOrder.findAll({ where: { orderID: req.params.orderID } });
		weaponOrders = weaponOrders.map((item) => converter(item.dataValues));
		for (let i = 0; i < weaponOrders.length; i++) {
			let obj = weaponOrders[i];
			let arr = Array(obj.count).fill({ ...obj, state: 'Available' });
			bulkWeapons.push(...arr);
		}
		ammunitionOrders = ammunitionOrders.map((item) => {
			item = converter(item.dataValues);
			item.remain = item.count;
			return item;
		});
		ammunitions = await AmmunitionBatch.bulkCreate(ammunitionOrders, {transaction:t});
        weapons = await Weapon.bulkCreate(bulkWeapons, {transaction:t});
        await t.commit();
		return res.status(200).send('Order completed');
	} catch (e) {
        await t.rollback();
		return res.status(400).send(e.message);
	}
};
