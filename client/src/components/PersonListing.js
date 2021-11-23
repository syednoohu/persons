import React from 'react'
import { useSelector } from 'react-redux'
import { getAllPersons } from '../features/personSlice'

export default function PersonListing() {
  const persons = useSelector(getAllPersons)
  console.log(persons)
  return (
    <div>
      hello
    </div>
  )
}
