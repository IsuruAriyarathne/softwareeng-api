const AmmunitionType = require("../model/ammunitionType.model");
const Supplier = require("../model/supplier.model");
const SupplyAmmunition = require("../model/supplyAmmo.model");
const SupplyWeapon = require("../model/supplyWeapon.model");
const WeaponModel = require("../model/weaponModel.model");
const { converter } = require("../utils/objectConverter");
const sequelize = require('../config/db')

exports.getCompanies = async (req, res) => {
	let suppliers = [];
	try {
		suppliers = await Supplier.findAll();
		return res.status(200).send(suppliers);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getCompany = async (req, res) => {
	let models = {};
	let supplyAmmunition = [];
	let supplyWeapon = [];
	try {

		supplyAmmunition = await SupplyAmmunition.findAll({
            where:{supplierID:req.params.supplierID},
            include:{
                model: AmmunitionType
            }
		})
		supplyAmmunition = supplyAmmunition.map(item => converter(item.dataValues))
        supplyWeapon = await SupplyWeapon.findAll({
            where:{
                supplierID:req.params.supplierID,
            },
            include:{
                model: WeaponModel
            }
		})
		supplyWeapon = supplyWeapon.map(item => converter(item.dataValues))
		models.SupplyAmmunition =supplyAmmunition;
		models.SupplyWeapon = supplyWeapon		

		return res
			.status(200)
			.send( models);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};



exports.createCompany = async (req, res) => {
	let company = req.body;
	try {
		company = await Supplier.create(req.body);
		return res
			.status(200)
			.send( company);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};


exports.updateCompany = async (req, res) => {
	let company = req.body;
	let supplyAmmunition = [];
	let supplyWeapon = [];
	let t = await sequelize.transaction();
	try {
		if(company.hasOwnProperty('SupplyAmmunition')){

			supplyAmmunition = await SupplyAmmunition.bulkCreate(company.SupplyAmmunition,{ignoreDuplicates:true, transaction:t});
			
		}
		
		if(company.hasOwnProperty('SupplyWeapon')){
			supplyWeapon = await SupplyWeapon.bulkCreate(company.SupplyWeapon,{ignoreDuplicates:true, transaction:t});
			
		}

		company = await Supplier.update(
			{ ...req.body },
			{
				where: {
					supplierID: req.params.supplierID,
				},
				transaction:t
			}
		);
		await t.commit();
		company = await Supplier.findOne({
			where: { supplierID: req.params.supplierID },
		});
		supplyAmmunition = await SupplyAmmunition.findAll({where:{supplierID:req.params.supplierID},include:{model:AmmunitionType}})
		supplyAmmunition = supplyAmmunition.map(item => converter(item.dataValues))
		supplyWeapon = await SupplyWeapon.findAll({where:{supplierID:req.params.supplierID},include:{model:WeaponModel}})
		supplyWeapon = supplyWeapon.map(item => converter(item.dataValues))
		company = company.dataValues;
		company.SupplyAmmunition = supplyAmmunition;
		company.SupplyWeapon = supplyWeapon;
		return res.status(200).send( company);
	} catch (e) {
		await t.rollback();
		return res.status(400).send( e.message);
	}
};

/**
 * @returns success or error message 
 */

exports.deleteCompany = async (req, res) => {
	try {
		await Supplier.destroy({ where: {  supplierID:req.params.supplierID } });
		return res.status(200).send('Succesfully supplier  deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Supplier cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message 
 */
exports.deleteAmmunitionTypes = async (req, res) => {
	try {
		await SupplyAmmunition.destroy({ where: {  supplierID:req.params.supplierID, ammoModelID:req.params.ammoModelID} });
		return res.status(200).send('Succesfully ammunition type  deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Ammunition Type cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};
/**
 * @returns success or error message 
 */
exports.deleteWeaponModel = async (req, res) => {
	try {
		await SupplyWeapon.destroy({ where: {  supplierID:req.params.supplierID, weaponModelID:req.params.weaponModelID } });
		return res.status(200).send('Succesfully weapon model  deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('Weapon Model cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};