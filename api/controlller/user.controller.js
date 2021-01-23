var User = require('../model/user.model');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const Station = require('../model/station.model');
const { sendMail } = require('../middleware/reportSender');
const { converter } = require('../services/objectConverter');

/**
 *@returns Array<{officerID, name, role, stationID, stationName, location, type, contactNo}> 
 */
exports.getUsers = async (req, res) => {
	let users = [];
	try {
		users = await User.findAll({ attributes: { exclude: 'password' }, include:{model:Station} });
		users = users.map(item => converter(item.dataValues))
		return res.status(200).send(users);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

/**
 *@returns Object { officerID, name, role, stationID }
 */
exports.getUser = async (req, res) => {
	let user = {};
	try {
		user = await User.findOne({ attributes:{exclude:'password'}, where: { officerID: req.params.userId } });
		if (user) {
			return res.status(200).send(user);
		} else {
			return res.status(404).send(user);
		}
	} catch (e) {
		return res.status(400).send(e.message );
	}
};

/**
 * @param {Object} req: req.body: {name, role,stationID}: password, officerID not required
 * @description Auto generates a password and send it to users mail stationID can be null
 *@returns Object{officerID, name, role, password, stationID}> 
 */
exports.createUser = async (req, res) => {
	let user = req.body;
	try {
		let password = generator.generate({
			length: 10,
			numbers: true,
		})
		let salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		user = await User.create(req.body);
		sendMail("SLF New User Password",password,user.email)
		return res
			.status(200)
			.send({ ...user.dataValues, password: password });
	} catch (e) {
		return res.status(400).send({ status: 400, message: e.message });
	}
};


/**
 * @param {Object} req: req.body: Any attribute excluding password
 *@returns Object{officerID, name, role, stationID, stationName, location, type, contactNo}
 */

exports.updateUser = async (req, res) => {
	let user = {};
	try {
		user = await User.update({ ...req.body }, { where: { officerID: req.params.userId }, returning: true });
		user = await User.findOne({ attributes:{exclude:'password'},where: { officerID: req.params.userId } ,include:{model:Station}});
		user = converter(user.dataValues)
		return res.status(200).send(user);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

/**

/**
 * @returns success or error message 
 */
exports.changePassword = async (req,res) =>{
	let password = req.body.password;
	let salt = await bcrypt.genSalt(10);
	password = await bcrypt.hash(password, salt);
	try{
		password = await User.update({password:password},{where:{officerID:req.params.userId}})
		return res.satus(200).send("Password succesfully changed")
	} catch (e){
		return res.status(400).send(e.message)
	}
}

/**
 * @returns success or error message 
 */
exports.deleteUser = async (req, res) => {
	try {
		await User.destroy({ where: { officerID: req.params.userId } });
		return res.status(200).send('Succesfully user deleted');
	} catch (e) {
		if(e.message.toLowerCase().includes('foreign key constraint')){
			return res.status(400).send('User cannot be deleted ,it has many records in database')
		}
		return res.status(400).send(e.message);
	}
};