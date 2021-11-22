// ** Seems these code are useless?
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const config = require('config');

const User = require('../../models/User');
const auth = require('../../config/middleware/auth');

router.post(
  '/',
   [
      [
        check('name', ' Please enter your name....').not().isEmpty(),
        check('branch', ' Please enter Branch').not().isEmpty(),
        check('userName', ' Please enter User name').not().isEmpty(),
        check('remark', ' Please enter Remark').not().isEmpty()


      ] 
   ], 
   async (req, res) => {
    const err = validationResult(req);
    console.log(req.body)
    if (!err.isEmpty()) {
      return res.status(400).json({ errors1 : err.array()});      
    }
    const {name, branch,userName,remark} = req.body;
    try {
      let user = await User.findOne({name});
      if (user) { 
         return res.status(400).json({ errors : [{ message : ' User Already Exist'}]}
      )}
      user = new User({name, branch, userName, remark});
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(name, salt);  
      await user.save();
      return res.status(200).json({ message : [{ user, message : ' Sucess'}]});
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
}); 


////



router.get('/', auth, (req, res) => res.send(' User Route - GET'));
router.delete('/', (req, res) => res.send(' User delete - DELETE'));


module.exports = router;