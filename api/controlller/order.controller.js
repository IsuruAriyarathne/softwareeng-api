const AmmunitionBatch = require("../model/ammunitionBatch.model");
const AmmunitionOrder = require("../model/ammunitionOrder.model");
const AmmunitionType = require("../model/ammunitionType.model");
const Order = require("../model/order.model");
const Supplier = require("../model/supplier.model");
const Weapon = require("../model/weapon.model");
const WeaponModel = require("../model/weaponModel.model");
const WeaponOrder = require("../model/weaponOrder.model");
const { converter } = require("../services/objectConverter");

exports.getOrders = async (req, res) => {
	let orders = [];
	try {
		orders = await Order.findAll({
            include:{
                model: Supplier
            }
        });
        orders = orders.map(item => converter(item.dataValues))
		return res.status(200).send( orders );
	} catch (e) {
		return res.status(400).send( e.message );
	}
};

exports.getOrder = async (req, res) => {
    let order = {};
    let ammoOrder = [];
    let weaponOrder = [];
	try {

		ammoOrder = await AmmunitionOrder.findAll({
            where:{orderID:req.params.orderID},
            include:{
                model: AmmunitionType
            }
        })
        weaponOrder = await WeaponOrder.findAll({
            where:{
                orderID:req.params.orderID,
            },
            include:{
                model: WeaponModel
            }
        })
        ammoOrder = ammoOrder.map((item) => converter(item.dataValues))
        weaponOrder = weaponOrder.map((item) => converter(item.dataValues))
        order.AmmoOrder = ammoOrder;
        order.WeaponOrder = weaponOrder;
		return res
			.status(200)
			.send( order);
	} catch (e) {
		return res.status(400).send( e.message );
	}
};



exports.createOrder = async (req, res) => {
    let order = req.body;
    let result = {};
    result.ammoOrder = [];
    result.weaponOrder = [];
	try {
        order = await Order.create(req.body);
        result = order.dataValues;
        if(req.body.hasOwnProperty('AmmoOrder')){
            result.ammoOrder = AmmunitionOrder.bulkCreate(req.body.ammoOrder)
        }
        
        if(req.body.hasOwnProperty('WeaponOrder')){
            result.weaponOrder = WeaponOrder.bulkCreate(req.body.weaponOrder)
        }

		return res
			.status(200)
			.send( order);
	} catch (e) {
		return res.status(400).send( e.message );
	}
};


exports.updateOrder = async (req, res) => {
    let order = req.body;
    let ammos = [];
    let weapons = [];

	try {
        if(order.hasOwnProperty('AmmoOrder')){
            ammos = await AmmunitionOrder.bulkCreate(order.AmmoOrder,{updateOnDuplicate:["count"]});
        }

        if(order.hasOwnProperty('WeaponOrder')){
            weapons = await WeaponOrder.bulkCreate(order.WeaponOrder,{updateOnDuplicate:["count"]});
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
        order = order.dataValues
        order.AmmoOrder = ammos;
        order.WeaponOrder = weapons;

        
		return res.status(200).send( order);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.completeOrder = async (req,res) =>{
    let ammunitionOrders = [];
    let weaponOrders = [];
    try{
        ammunitionOrders = await AmmunitionOrder.findAll({where:{orderID:req.params.orderID}})
        weaponOrders = await WeaponOrder.findAll({where:{orderID:req.params.orderID}})
        weaponOrders = weaponOrders.map(item => converter(item.dataValues))
        ammunitionOrders = ammunitionOrders.map(item =>{
            item = converter(item.dataValues)
            item.remain = item.count
            return item;
        })
        ammunitions = await AmmunitionBatch.bulkCreate(ammunitionOrders);
        weapons = await Weapon.bulkCreate(weaponOrders)
    }catch(e){
		return res.status(400).send(e.message);
    }
    
}
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