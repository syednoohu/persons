// We are using name as the password - Need to FIX!!!

const {User} = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

//** 04Feb -  */
const userController = {
   async createUser(req, res) {
    const {name, branch,userName,remark} = req.body;
    try {
      let user = await User.findOne({name});
      if (user) { 
         return res.status(400).json({ errors : [{ message : ' User Already Exist'}]}
      )}
      user = new User({name, branch, userName, remark});
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(name, salt);  
      console.log(user.password);
      await user.save();
      return res.status(200).json({ message : { ...user, message : ' Sucess'}});
      // return res.status(200).json({ message : [{ user, message : ' Sucess'}]});
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }

  },
  
  async getUsers(req, res) {
      let allUsers = await User.find({})
      return res.status(200).json({allUsers});
      // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/users'}});

  },

  async getUser(req, res) {
    let user = await User.find({name : req.params.name});
    return res.status(200).json({user});
    // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/users'}});

},

  updateUser(req, res) {
    return res.status(200).json({ message : { message : 'PUT : http://localhost:5000/api/users'}});

  },
  
  deleteUser(req, res) {
    return res.status(200).json({"Deleted" : "ok"});

  }
}

module.exports = userController;