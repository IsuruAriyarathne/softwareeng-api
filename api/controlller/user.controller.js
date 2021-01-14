const User = require('../model/user.model');
// const Op = db.Sequelize.Op;


exports.findAll = async () => {
    const users = await User.findAll();
    return users;
}