import { configureStore } from '@reduxjs/toolkit'
import  formActionSlice  from './formActionSlice'
import personSlice  from './personSlice'

export const store = configureStore({
  reducer: {
    persons : personSlice,
    formActions : formActionSlice
  },
})