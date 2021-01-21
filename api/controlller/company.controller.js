const AmmunitionType = require("../model/ammunitionType.model");
const Supplier = require("../model/supplier.model");
const SupplyAmmunition = require("../model/supplyAmmo.model");
const SupplyWeapon = require("../model/supplyWeapon.model");
const WeaponModel = require("../model/weaponModel.model");


exports.getCompanies = async (req, res) => {
	let suppliers = [];
	try {
		suppliers = await Supplier.findAll();
		return res.status(200).json({ status: 200, data: suppliers, message: 'Companies succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
			.json({ status: 200, data: models, message: 'company succesfully retrieved' });
	} catch (e) {
		return res.status(400).json({ status: 401, message: e.message });
	}
};



exports.createCompany = async (req, res) => {
	let company = req.body;
	try {
		company = await Supplier.create(req.body);
		return res
			.status(200)
			.json({ status: 200, data: company, message: 'Company succesfully created' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
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
		return res.status(200).json({ status: 200, data: company, message: 'Company succesfully updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

//check
