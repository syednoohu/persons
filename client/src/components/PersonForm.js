import React from 'react'
import { Button, Modal, Icon, Form, Header, Segment, SegmentGroup } from 'semantic-ui-react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ifopenPersonForm, ifNewPerson, ifViewPerson, ifEditPerson } from '../features/formActionSlice'

import { addPerson } from '../features/personSlice';
import { formOpen, formClose } from '../features/formActionSlice';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const genderOpt = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'o', text: 'Other', value: 'Other' },
]


export default function PersonForm() {
  const dispatch = useDispatch();
  const ifFormToOpen = useSelector(ifopenPersonForm)
  const newPerson = useSelector(ifNewPerson)
  const viewPerson = useSelector(ifViewPerson)
  const editPerson = useSelector(ifEditPerson)
  const [formData, setformData] = useState({ stack:'mern', gender:"Male"});
  
  let formTitle =  newPerson ? "Add New Person" : editPerson  ?  "Edit Person" : viewPerson ?  "View Person"  : null
  let formIcon =  newPerson ? "add" : editPerson  ?  "edit" : viewPerson ?  "eye"  : null
  const handleChange = (e) => {
    e.persist();
    setformData(formData => ({ 
      ...formData, 
      [e.target.name]: e.target.value })
    )
  }

  const  handleClose = () =>  {
    dispatch(formClose())
  }

  const handleChangeRadio = (e, {value,name}) => {
    e.persist();
    setformData(formData => ({ 
      ...formData, 
      [name]: value })
    )
  }

  const  handleSubmit = async (e) =>  {
    e.preventDefault();
    dispatch(formClose(true))
    setformData({ stack:'mern', gender:"Male"});

    // const url = 'https://persons-server.herokuapp.com/api/persons';
    const url = 'http://localhost:5000/api/persons';   // for local
    const data = JSON.stringify({
      firstname    : formData.fname,
      lastname  : formData.lname,
      age: formData.age,
      gender  : formData.gender,
      stack  : formData.stack,
      about  : formData.about
    });
    try {
      const config = {
        headers :{
          'content-type' : 'application/json'
        }
      };

      // check if addPerson OR editPerson
      // const res = await axios.put(url, data, config);

      const res = await axios.post(url, data, config);

      dispatch(addPerson(res.data))

        } catch (error) {
      console.log('Err printed in Client : ', error.response);
    }
    
  }
  return (

    // <Segment textAlign='right' size = 'tiny'  >
      //if Edit change the <header/>
      <Modal  as={Form} 
        onClose={()=> dispatch(formClose(false))}
        onOpen={()=> dispatch(formOpen(true))}
        onSubmit={e => handleSubmit(e)} 
        open={ ifFormToOpen }  
        size="large"
        closeIcon 
        dimmer ='blurring' >
        <Header icon={formIcon} content={formTitle} as="h2" />
        <Modal.Content>
          <Form.Group widths='equal'>
            <Form.Input  value = {formData.fname ||''} name = 'fname' label='First name' placeholder='First name' width={7} required onChange={handleChange}  />
            <Form.Input  value = {formData.lname ||''} name = 'lname' label='Last name' placeholder='Last name' width={7} required onChange={handleChange} />
          </Form.Group>

          <Form.Group >
            <Form.Input  value = {formData.age ||''} name = 'age' label='age' placeholder='age' width={2} required onChange={handleChange} />
            <Form.Field value = {formData.gender ||''} name = "gender" label='Gender' control='select' onChange={handleChange}  width={5}>
              {genderOpt.map((option) => (
                <option  key={option.value} value={option.value}>{option.text}</option>
              ))}
            </Form.Field>
          </Form.Group>

          <Form.Group inline>
            <label>Stack</label>
            <Form.Radio
              label='MERN'
              value='mern' 
              name = 'stack'
              checked={formData.stack === 'mern'}
              onChange={handleChangeRadio}
            />
            <Form.Radio
              label='MEAN'
              value='mean' 
              name = 'stack'
              checked={formData.stack === "mean"}
              onChange={handleChangeRadio}
            />
            <Form.Radio
              label='PERN'
              value='pern' 
              name = 'stack'
              checked={formData.stack === "pern"}
              onClick={handleChangeRadio}
            />
          </Form.Group>
          
          <Form.TextArea 
            label='About' 
            placeholder='Tell us more about you...' 
            value={formData.about ||''} 
            name = 'about'
            required
            onChange={handleChange}
            />
        </Modal.Content>
        <Modal.Actions>
          <Button 
            type="button" 
            color="red" 
            icon="times" 
            content="Close" 
            labelPosition='left'
            onClick = {()=> handleClose()}
            // onClick = {()=> handleModal(false)}
          />
          <Button 
            type="submit" 
            color="green" 
            icon="save" 
            content="Save" 
            labelPosition='left'
            // onClick = {()=> handleModal(false)}
          />
        </Modal.Actions>
      </Modal>
    // </Segment>


  )
}
