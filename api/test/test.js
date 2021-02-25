const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const faker = require('faker');
const User = require('../model/user.model')
const UserController = require('../controlller/user.controller')
const {createUser,getUsers} = require('./helpers/user.helper')
const { converter } = require('../utils/objectConverter');

chai.use(sinonChai)
const { expect } = chai


const mockResponse = () => {
  const res = {};
  res.status = sinon.stub()
  res.send = sinon.stub()
  res.status.returns(res);
  return res;
};



describe('UserController', () => {
  let res,sandbox = null
  beforeEach(() => {
    res = mockResponse()
    sandbox = sinon.createSandbox()
  });

  afterEach(() => {
    sandbox.restore()
  })


  // describe('create a user', () => {
  //   it('should create a team successfully', async () => {
  //     let user = createUser();

  //     const req = {
  //       body: user,
  //     };
      
  //     const stub = sandbox.stub(User, 'create').callsFake(() =>{

  //     });

  //     stub.

      
  //     teamController = new TeamController(userService, adminService, teamService);

  //     await teamController.createTeam(req, res);

  //     expect(errorStub.calledOnce).to.be.true;
  //     expect(adminStub.calledOnce).to.be.true;
  //     expect(stub.calledOnce).to.be.true;
  //     expect(res.status.calledOnce).to.be.true;
  //     expect(res.json.calledOnce).to.be.true;
  //     expect(res.status).to.have.been.calledWith(201);
  //     expect(res.json).to.have.been.calledWith({'status': 201, 'data': stubValue });
  //   })
  // });

  // describe('updateTeam', () => {

  //   it('should update a team successfully', async () => {
  //     const req = {
  //       body: { name: faker.name.findName() },

  //       //make sure the id here, matches the admin id from the team we wishes to update
  //       tokenMetadata: { _id: '5e678b4527b990c36ff39dda' }, 

  //       params: { id: '5e6403c9e4ca0f9fce20b1b3'} //this id is valid
  //     };

  //     const stubValue = {
  //       name: faker.name.findName(),
  //     };

  //     //our concern is making sure that we supply a valid to the admin that created the Team:
  //     const formerTeam = {
  //       _id: faker.random.uuid(),
  //       name: 'former team',
  //       admin: {
  //         _id: new ObjectID('5e678b4527b990c36ff39dda'), //this id is same as the one in the tokenMetada
  //       }
  //     }
  //     const errorStub = sandbox.stub(validate, 'teamValidate').returns([]); //no input errors
  //     const formerStub = sandbox.stub(teamService, 'adminGetTeam').returns(formerTeam);
  //     const stub = sandbox.stub(teamService, 'updateTeam').returns(stubValue);

  //     teamController = new TeamController(userService, adminService, teamService);

  //     await teamController.updateTeam(req, res);

  //     expect(formerStub.calledOnce).to.be.true;
  //     expect(errorStub.calledOnce).to.be.true;
  //     expect(stub.calledOnce).to.be.true;
  //     expect(res.status.calledOnce).to.be.true;
  //     expect(res.json.calledOnce).to.be.true;
  //     expect(res.status).to.have.been.calledWith(200);
  //     expect(res.json).to.have.been.calledWith({'status': 200, 'data': stubValue });
  //   });
  // });

  describe('delete user', () => {

    it('should delete user successfully', async () => {
      const req = { params: 1 };

      const destroy = sandbox.stub(User,'destroy').callsFake(() => true)

      await UserController.deleteUser(req, res);

      expect(destroy.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.send.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith('Succesfully user deleted');

    });
    
    it('should fail delete due to foreign key constraint', async () => {
      const req = { params: 1 };

      const destroy = sandbox.stub(User,'destroy').callsFake(() => {throw new Error('foreign key constraint')})

      await UserController.deleteUser(req, res);

      expect(destroy.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.send.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(400);
      expect(res.send).to.have.been.calledWith('User cannot be deleted ,it has many records in database');

    });


  });

  describe('get users', () => {

    it('should get all users successfully', async () => {
      const req = {};
      let users = getUsers();
      const findAll = sandbox.stub(User, 'findAll').callsFake(() => users) 
      
      await UserController.getUsers(req,res);
      
      users = users.map(item => converter(item.dataValues));

      expect(findAll.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.send.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(users);

    });
    
    it('should get the user specified in the req.param.userId', async () => {
      const req = { params: 1 };
      let users = getUsers();
      const findOne = sandbox.stub(User, 'findOne').callsFake(() => users[0]) 
      
      await UserController.getUser(req,res);
      
      expect(findOne.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.send.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.send).to.have.been.calledWith(users[0]);

    });
    
    it('should get an state of 404 when the user specified in the req.param.userId is not found', async () => {
      const req = { params: 11 };

      const findOne = sandbox.stub(User, 'findOne').callsFake(() => null) 
      
      await UserController.getUser(req,res);
      
      expect(findOne.calledOnce).to.be.true;
      expect(res.status.calledOnce).to.be.true;
      expect(res.send.calledOnce).to.be.true;
      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith("User not found");

    });
  });
});