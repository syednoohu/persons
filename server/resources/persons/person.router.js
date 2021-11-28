// validate check the data validation
const express = require('express');
const personRouter = express.Router();
const personController = require('./person.controllers');
const {validate} = require('./person.model')

personRouter.post('/', validate, personController.createPerson);

personRouter.get('/',personController.getPersons);
personRouter.get('/:id', personController.getPerson);

personRouter.put('/:id', personController.updatePerson);
personRouter.delete('/:id', personController.deletePerson);

module.exports = personRouter;

