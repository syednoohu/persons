const { check, validationResult} = require('express-validator')
const mongoose = require('mongoose');
const PersonSchema = new mongoose.Schema(
  {
    firstname :   {type: String, required: true},
    lastname  :   {type: String, required: true},
    age       :   {type: Number, required: true},
    gender    :   {type: String,required: true,enum : ["Male", "Female", "Other"],default : "Male"},
    stack     :   {type: String, required: true},
    about     :   {type: String, required: true},
    dateCreated:  {type: Date,   required: false, default: Date.now},
    dateModified: {type: Date,   required: false, default: Date.now}
  }
);

const Person = mongoose.model('Person', PersonSchema);

const validate = [  
    [
      check('firstname', ' Please enter first name....').not().isEmpty(),
      check('lastname', ' Please enter last name').not().isEmpty(),
      check('age', ' Please enter age').not().isEmpty(),
      check('stack', ' Please enter stack').not().isEmpty(),
      check('about', ' Please enter about').not().isEmpty()
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

module.exports = {Person,validate} 
