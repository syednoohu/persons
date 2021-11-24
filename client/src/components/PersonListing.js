import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPersons } from '../features/personSlice'

import axios from 'axios';

import {  Table, Button, Icon } from 'semantic-ui-react';
export default function PersonListing() {
  const persons = useSelector(getAllPersons)

  const  deletePerson = async (id) =>  {

    // const url = 'https://persons-server.herokuapp.com/api/persons';
    const url = `http://localhost:5000/api/persons/${id}`;   // for local

    try {
      const config = {
        headers :{
          'content-type' : 'application/json'
        }
      };
      const res = await axios.delete(url, config);
        console.log(res)
        } catch (error) {
      console.log('Err printed in Client : ', error.response);
    }
    
  }

  return (
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
              >
              <Icon name='eye' /> View
            </Button>
          </Table.Cell>
          <Table.Cell width={2}>
            <Button  icon labelPosition='left' color = 'grey' size='mini'>
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

  )
}
