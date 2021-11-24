// const { default: personSlice } = require('../../../client/src/features/personSlice');
const {Person} = require('./person.model');

const personController = {

  async createPerson(req, res) {
    console.log ("You WON")
    const {firstname, lastname, age, gender, stack, about} = req.body;
    try {
      person = new Person({firstname, lastname, age, gender, stack, about});
      await person.save();
      return res.status(200).json(person);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }

  },
  
  async getPersons(req, res) {
    console.log('GET - getPerosns')
    let response = await Person.find({})
    return res.status(200).json(response);
    // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/persons'}});

  },

  async getPerson(req, res) {
    let person = await Person.find({name : req.params.name});
    return res.status(200).json({person});
    // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/users'}});

},

  updatePerson(req, res) {
    return res.status(200).json({ message : { message : 'PUT : http://localhost:5000/api/persons'}});

  },
  
  async deletePerson(req, res) {
    console.log(req.params.id)
    let person = await Person.findByIdAndDelete({_id:req.params.id});
    console.log(person)
    // console.log ("async deletePerson(req, res)", _id)
    return res.status(200).json(person);

  }
}

module.exports = personController;