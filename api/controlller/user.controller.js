var User = require('../model/user.model');
const bcrypt = require('bcrypt');
var generator = require('generate-password');
const Station = require('../model/station.model');
const { sendMail } = require('../middleware/reportSender');
const { converter } = require('../services/objectConverter');

exports.getUsers = async (req, res) => {
	let users = [];
	try {
		users = await User.findAll({ attributes: { exclude: 'password' }, include:{model:Station} });
		// users = users.map(item => converter(item.dataValues))
		return res.status(200).send(users);
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

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

exports.updateUser = async (req, res) => {
	let user = {};
	try {
		user = await User.update({ ...req.body }, { where: { officerID: req.params.userId }, returning: true });
		user = await User.findOne({ attribute:{exclude:'password'},where: { officerID: req.params.userId } });
		return res.status(200).send({ status: 200, data: user, message: 'Succesfully user updated' });
	} catch (e) {
		return res.status(400).send({ status: 400, message: e.message });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.destroy({ where: { officerID: req.params.userId } });
		return res.status(200).send({ status: 200, message: 'Succesfully user deleted' });
	} catch (e) {
		return res.status(400).send({ status: 400, message: e.message });
	}
};
