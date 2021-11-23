import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persons: []
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state.persons = action.payload
    },
  },
})

// Action creators are generated for each case reducer function

export const getAllPersons  = (state) => state.persons.persons
export const { addPerson } = personSlice.actions
export default personSlice.reducer