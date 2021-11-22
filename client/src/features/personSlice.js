import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persons: [],
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, action) => {
      state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPerson } = personSlice.actions

export default personSlice.reducer