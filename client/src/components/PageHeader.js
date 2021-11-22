import React from 'react';
import axios from 'axios';
import { Segment, Grid, Button, Icon, Image, Modal, Form, Header } from 'semantic-ui-react';

import logo from '../image/logo.png';
import {useState} from 'react';

const genderOpt = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function PageHeader() {
  const [modalOpen, handleModal] = useState(false);
  const [formData, setformData] = useState({ stack:'mern', gender:"male"});


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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal(false)
    console.log("form submitted")
    console.log(formData)
  }

  const  handleSubmit1 = async (e) =>  {
    e.preventDefault();
    handleModal(false)

    const url = './api/persons';
    const data = JSON.stringify({
      name    : formData.fname,
      branch  : formData.lname,
      userName: formData.age,
      remark  : formData.gender,
      remark  : formData.stack,
      remark  : formData.about
    });
    try {
      const config = {
        headers :{
          'content-type' : 'application/json'
        }
      };
      const res = await axios.post(url, data, config);
        } catch (error) {
      console.log('Err printed in Client : ', error.response);
    }
    
  }



  return (
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
    
  )
}
