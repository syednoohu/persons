import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPersons } from '../features/personSlice'
import { useDispatch } from 'react-redux';
import { removePerson } from '../features/personSlice';
import { useState } from 'react';
import {formOpen,formEdit, formView } from '../features/formActionSlice';

import PersonForm from './PersonForm'

import axios from 'axios';
import {  Table, Button, Icon, Segment } from 'semantic-ui-react';

export default function PersonListing() {
//  const [editMode, handleEdit] = useState(false);

 const persons = useSelector(getAllPersons)
 const dispatch = useDispatch();

  const  viewPerson = async (id) =>  {
    console.log("to View", id)
    dispatch(formOpen(true))
    dispatch(formView(true))
    const url = `https://persons-server.herokuapp.com/api/persons/${id}`;
    // const url = `http://localhost:5000/api/persons/${id}`;   // for local

    try {
      const config = {
        headers :{
          'content-type' : 'application/json'
        }
      };
      const res = await axios.get(url, config);
      // once deleted in DB , delete the same record in Redux(dispatch) so to update the UI
      // dispatch(selectedPerson(res.data))/// left here

        } catch (error) {
      console.log('Err printed in Client : ', error);
    }

  }
  const  editPerson = (id) =>  {
    console.log("to edit", id)
    dispatch(formOpen(true))
    dispatch(formEdit(true))


  }


    const  deletePerson = async (id) =>  {
    const url = `https://persons-server.herokuapp.com/api/persons/${id}`;
    // const url = `http://localhost:5000/api/persons/${id}`;   // for local

    try {
      const config = {
        headers :{
          'content-type' : 'application/json'
        }
      };
      const res = await axios.delete(url, config);
      // once deleted in DB , delete the same record in Redux(dispatch) so to update the UI
      dispatch(removePerson(res.data))

        } catch (error) {
      console.log('Err printed in Client : ', error);
    }
    
  }

  return (

    <Segment>
    <Table celled striped singleLine fixed>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell width={4}>Name </Table.HeaderCell>
        <Table.HeaderCell width={1}>Age </Table.HeaderCell>
        <Table.HeaderCell width={1}>Gender </Table.HeaderCell>
        <Table.HeaderCell width={1}>Stack </Table.HeaderCell>
        <Table.HeaderCell width={6}>About </Table.HeaderCell>
        <Table.HeaderCell width={2}> </Table.HeaderCell>
        <Table.HeaderCell width={2}> </Table.HeaderCell>
        <Table.HeaderCell width={2}> </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {persons.map(({ _id, firstname, lastname, age, stack, gender, about }) => (
          <Table.Row key={_id}>
            <Table.Cell>{firstname}</Table.Cell>
            <Table.Cell>{age}</Table.Cell>
            <Table.Cell>{gender}</Table.Cell>
            <Table.Cell>{stack}</Table.Cell>
            <Table.Cell>{about}</Table.Cell>

            <Table.Cell width={2}>
              <Button   icon labelPosition='left' primary size='mini'
                onClick={()=>{viewPerson(_id)}}            
                >
                <Icon name='eye' /> View
              </Button>
            </Table.Cell>
            <Table.Cell width={2}>
              <Button  icon labelPosition='left' color = 'grey' size='mini'
                onClick={()=>{editPerson(_id)}}            
                >
                <Icon name='edit' /> Edit
              </Button>
            </Table.Cell>
            <Table.Cell width={2}
            >
              <Button  icon labelPosition='left' color = 'red' size='mini'
                onClick={()=>{deletePerson(_id)}}            
              >
                <Icon name='delete' /> Delete
              </Button>
            </Table.Cell>

          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </Segment>




  )
}
