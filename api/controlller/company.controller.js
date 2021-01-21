const AmmunitionType = require("../model/ammunitionType.model");
const Supplier = require("../model/supplier.model");
const SupplyAmmunition = require("../model/supplyAmmo.model");
const SupplyWeapon = require("../model/supplyWeapon.model");
const WeaponModel = require("../model/weaponModel.model");


exports.getCompanies = async (req, res) => {
	let suppliers = [];
	try {
		suppliers = await Supplier.findAll();
		return res.status(200).send( suppliers);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

exports.getCompany = async (req, res) => {
    let models = {};
	try {

		models.ammoModels = await SupplyAmmunition.findAll({
            where:{supplierID:req.params.supplierID},
            include:{
                model: AmmunitionType
            }
        })
        models.weaponModels = await SupplyWeapon.findAll({
            where:{
                supplierID:req.params.supplierID,
            },
            include:{
                model: WeaponModel
            }
        })

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
	let company = {};
	try {
		company = await Supplier.update(
			{ ...req.body },
			{
				where: {
					supplierID: req.params.supplierID,
				},
			}
		);
		company = await Supplier.findOne({
			where: { supplierID: req.params.supplierID },
		});
		return res.status(200).send( company);
	} catch (e) {
		return res.status(400).send( e.message);
	}
};

//check
