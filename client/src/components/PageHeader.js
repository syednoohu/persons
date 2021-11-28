import React from 'react';
import axios from 'axios';
import { Segment, Grid, Image, Button, Icon } from 'semantic-ui-react';
import { addPersons } from '../features/personSlice';
import {formOpen, formNew } from '../features/formActionSlice';



import logo from '../image/logo.png';
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';


export default function PageHeader() {
    const dispatch = useDispatch();

    const  newPerson = () =>  {
      console.log("New Person")
      dispatch(formOpen())
      dispatch(formNew())
    }
  
  useEffect(() => {
    const getAllPersons = async() => {
      const res = await axios.get('https://persons-server.herokuapp.com/api/persons')
      // const res = await axios.get('http://localhost:5000/api/persons') //for localhost
      dispatch(addPersons(res.data))
    }
    getAllPersons()
    // return () => {
    //   console.log("cleaningup")
    // }
  },[dispatch])

  return (
    <Segment color = 'grey' secondary >
      <Grid padded>
        <Grid.Row >
          <Grid.Column width={6}>
            <Image size='small' src ={logo}/>
          </Grid.Column>
          <Grid.Column floated='right' width={10}>
              <Button primary inverted floated='right' 
                onClick={() => newPerson()}
                 >
                <Icon name='add' /> Add New
              </Button>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>  
  )
}

