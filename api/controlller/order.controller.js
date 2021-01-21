const AmmunitionOrder = require("../model/ammunitionOrder.model");
const AmmunitionType = require("../model/ammunitionType.model");
const Order = require("../model/order.model");
const Supplier = require("../model/supplier.model");
const WeaponModel = require("../model/weaponModel.model");
const WeaponOrder = require("../model/weaponOrder.model");

exports.getOrders = async (req, res) => {
	let orders = [];
	try {
		orders = await Order.findAll({
            include:{
                model: Supplier
            }
        });
		return res.status(200).json({ status: 200, data: orders, message: 'Orders succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.getOrder = async (req, res) => {
    let order = {};
	try {

		order.ammoOrder = await AmmunitionOrder.findAll({
            where:{orderID:req.params.orderID},
            include:{
                model: AmmunitionType
            }
        })
        order.weaponorder = await WeaponOrder.findAll({
            where:{
                orderID:req.params.orderID,
            },
            include:{
                model: WeaponModel
            }
        })

		return res
			.status(200)
			.json({ status: 200, data: order, message: 'Order succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};



exports.createOrder = async (req, res) => {
    let order = req.body;
    let result = {};
    result.ammoOrder = [];
    result.weaponOrder = [];
	try {
        order = await Order.create(req.body);
        if(order.hasOwnProperty('ammoOrder')){
            result.ammoOrder = AmmunitionOrder.bulkCreate(order.ammoOrder)
        }
        
        if(order.hasOwnProperty('weaponOrder')){
            result.weaponOrder = WeaponOrder.bulkCreate(order.weaponOrder)
        }

		return res
			.status(200)
			.json({ status: 200, data: order, message: 'Order succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};


exports.updateOrder = async (req, res) => {
    let order = req.body;
    let ammos = [];
    let weapons = [];

	try {
        if(order.hasOwnProperty('ammoOrder')){
            ammos = await AmmunitionOrder.bulkCreate(order.ammoOrder,{updateOnDuplicate:["count"]});
        }

        if(order.hasOwnProperty('weaponOrder')){
            weapons = await WeaponOrder.bulkCreate(order.ammoOrder,{updateOnDuplicate:["count"]});
        }
		order = await Order.update(
			{ ...req.body },
			{
				where: {
					orderID: req.params.orderID,
				},
			}
		);
		order = await Order.findOne({
			where: { orderID: req.params.orderID },
        });

        order.ammoOrder = ammos;
        order.weaponOrder = weapons;

        
		return res.status(200).json({ status: 200, data: order, message: 'Order succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

//check


            // let newAmmoOrder = [];
            // let updateAmmoOrder = [];
            // let available = await AmmunitionOrder.findAll({
            //     where:{
            //         orderID:order.orderID,
            //         ammoModelID: ammos.map(item => item.ammoModelID)
            //     }
            // })
            // ammos.foreach(item =>{
            //     let index = available.findIndex(entry => entry.ammoModelID = item.ammoModelID)
            //     if(index>=0) {
            //         if(item.count != available[index].count){
            //             updateAmmoOrder.push(item);
            //         }
            //     }
            //     else{
            //         newAmmoOrder.push(item)
            //     }

            // })