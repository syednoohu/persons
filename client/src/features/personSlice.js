import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persons: []
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPersons: (state, action) => {
      state.persons = action.payload
    },
    
    addPerson: (state, action) => {
      state.persons.push(action.payload)
    },

    removePerson: (state, action) => {
      let index = state.persons.findIndex(p => p._id ===action.payload._id);
      state.persons.splice(index, 1)
      //get the _id of the person, get the index, splice it splice(index, 1)
      
    },
  },
})

// Action creators are generated for each case reducer function

export const getAllPersons  = (state) => state.persons.persons
export const { addPersons, addPerson, removePerson } = personSlice.actions
export default personSlice.reducer