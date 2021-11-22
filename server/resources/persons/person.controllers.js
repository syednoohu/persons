const {Person} = require('./person.model');

const personController = {
   async createPerson(req, res) {
    const {firstname, lastname, age, stack, about} = req.body;
    try {
      person = new Person({firstname, lastname, age, gender, stack, about});
      await person.save();
      return res.status(200).json({ message : { ...person, message : ' Sucess'}});
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }

  },
  
   getPersons(req, res) {
    // console.log('GET - getPerosns')
    return res.status(200).send('GET - xxxxxxxxxxxxxxgetPerosns');

      // let allPersons = await Person.find({})
      // return res.status(200).json({allPersons});
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
  
  deletePerson(req, res) {
    return res.status(200).json({"Deleted" : "ok"});

  }
}

module.exports = personController;