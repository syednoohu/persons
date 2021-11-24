// We can make seperate FakeDb.js to seed our DB! like Start with ADMIN/ROOT user 
// Best place is config/db.js in the .then block,i.e after successfully connected to our DB 
// <const fakeDb = new FakeDb(); fakeDb.seedDb();>
// create class/constructor/array of user Objects and iterate and add/save to DB
// const {User} = require('./user.model'); <--- this has to import
// class FakeDb()
//  constructor () { 
//    this.users = [{name:"ROOT"....},{name:"ADMIN"....},...]
//  }  
//  pushUserToDb () { this.users.forEach(user => { 
//   const newUser= new User (user) newUser.save();}) 
//  }
//  seedDb() { this.pushUserToDb() } 
// }     
// User.remove({})   <--- it will remove all documents in User Collection                            
const { check, validationResult} = require('express-validator')
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    name :        {type: String, required: true},
    password:     {type: String, required: true},
    branch:       {type: String, required: false},
    userName:     {type: String, required: false, uppercase:true},
    userRole:     {type: String, required: true,  default: 'User',enum :[ 'Admin', 'Manager', 'User']},       
    remark:       {type: String, required: false},
    createdBy:    {type: String, required: false},
    modifiedBy:   {type: String, required: false},
    dateCreated:  {type: Date,   required: false, default: Date.now},
    dateModified: {type: Date,   required: false, default: Date.now}
  }
);

const User = mongoose.model('User', UserSchema);

UserSchema.pre()
const validate = [  
    [
      check('name', ' Please enter your name....').not().isEmpty(),
      check('branch', ' Please enter Branch').not().isEmpty(),
      check('userName', ' Please enter User name').not().isEmpty(),
      check('remark', ' Please enter Remark').not().isEmpty()
    ], 

    (req, res, next) => {
      const errors = validationResult(req)
        if (errors.isEmpty()) {
          return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
        res.status(400).json({errors: extractedErrors})
    }
 ]
 


module.exports = {User,validate} 
// exports.User = User;
// exports.validate = validate;
