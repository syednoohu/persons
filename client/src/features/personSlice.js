import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persons: [],
  selectedPerson:{}
  
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPersons: (state, action) => {
      state.persons = action.payload
    },
    
    selectedPerson: (state, action) => {
      state.selectedPerson = action.payload
    },

    addPerson: (state, action) => {
      state.persons.push(action.payload)
    },

    updatePerson: (state, action) => {
      let index = state.persons.findIndex(p => p._id ===action.payload._id);
      state.persons.splice(index, 1, action.payload)
    },

    removePerson: (state, action) => {
      let index = state.persons.findIndex(p => p._id ===action.payload._id);
      state.persons.splice(index, 1)
    },
  },
})

// Action creators are generated for each case reducer function

export const getAllPersons  = (state) => state.persons.persons
export const getselectedPerson  = (state) => state.persons.selectedPerson
export const { addPersons, addPerson, removePerson, updatePerson, selectedPerson } = personSlice.actions
export default personSlice.reducer