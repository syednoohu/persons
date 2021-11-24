import React from 'react';
import axios from 'axios';
import { Segment, Grid, Button, Icon, Image, Modal, Form, Header } from 'semantic-ui-react';
import { addPersons, addPerson } from '../features/personSlice';


import logo from '../image/logo.png';
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import PersonListing from './PersonListing';

const genderOpt = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'o', text: 'Other', value: 'Other' },
]

export default function PageHeader() {
  const [modalOpen, handleModal] = useState(false);
  const [formData, setformData] = useState({ stack:'mern', gender:"Male"});
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllPersons = async() => {
      // const res = await axios.get('https://persons-server.herokuapp.com/api/persons')
      const res = await axios.get('http://localhost:5000/api/persons') //for localhost
      console.log(res.data)
      dispatch(addPersons(res.data))
    }
    getAllPersons()
    return () => {
      console.log("cleaningup")
    }
  },[])

  const handleChange = (e) => {
    e.persist();
    setformData(formData => ({ 
      ...formData, 
      [e.target.name]: e.target.value })
    )
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
    handleModal(false)
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
      const res = await axios.post(url, data, config);
        console.log(res)  
        dispatch(addPerson(res.data))

        } catch (error) {
      console.log('Err printed in Client : ', error.response);
    }
    
  }

  return (
    <Segment.Group>
      <Segment >
        <Grid padded>
          <Grid.Row >
            <Grid.Column floated='left' width={6}>
              <Image size='small' floated='left' src ={logo}/>
            </Grid.Column>
            <Grid.Column floated='right' width={10}>
              <Button primary inverted floated='right' onClick={() => handleModal(true)} >
                <Icon name='add' /> Add New
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Modal  as={Form} 
          onClose={()=> handleModal(false)}
          onOpen={()=> handleModal(true)}
          onSubmit={e => handleSubmit(e)} 
          open={modalOpen} 
          size="large"
          closeIcon 
          dimmer ='blurring' >
          <Header icon="pencil" content="Add New Person" as="h2" />
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
                onClick = {()=> handleModal(false)}
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
      </Segment>
      <Segment>
        <PersonListing/>
      </Segment>
    </Segment.Group>
  )
}

