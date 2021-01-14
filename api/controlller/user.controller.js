const User = require('../model/user.model');
// const Op = db.Sequelize.Op;


exports.findAll = async () => {
    let users = [];
    User.findAll()
    .then()
    return users;
}

exports.create = async (data) => {
    const users = await User.create({...data});
    return users;
}

exports.findOne = (id) => {
    const user = await User.findByPk(id)
    return user;
};
  
  exports.update = (data) => {
    const id = req.params.id;
  
    User.update(data, {
      where: { id: data.id }
    })
  };
  
  exports.delete = (id) => {
  
    User.destroy({
      where: { id: id }
    })
      
  };
  