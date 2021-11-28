const {Person} = require('./person.model');

const personController = {

  async createPerson(req, res) {
    const {firstname, lastname, age, gender, stack, about} = req.body;
    try {
      person = new Person({firstname, lastname, age, gender, stack, about});
      await person.save();
      return res.status(200).json(person);
    } 
    catch (err) {
      res.status(500).send('server error');
    }

  },
  
  async getPersons(req, res) {
    let response = await Person.find({})
    return res.status(200).json(response);
    // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/persons'}});

  },

  async getPerson(req, res) {
    let person = await Person.findById({_id:req.params.id});
    return res.status(200).json({person});  // WY {person}
    // return res.status(200).json({ message : { message : 'GET : http://localhost:5000/api/users'}});

},

  async updatePerson(req, res) {
    console.log(req.body)
    let person = await Person.findByIdAndUpdate({_id:req.params.id},{$set:req.body} , {new: true});
    console.log(person,req.params.id)
    return res.status(200).json(person);

  },
  
  async deletePerson(req, res) {
    let person = await Person.findByIdAndDelete({_id:req.params.id});
    // console.log ("async deletePerson(req, res)", _id)
    return res.status(200).json(person);

  }
}

module.exports = personController;