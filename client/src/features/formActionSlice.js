import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  actions: {
    openForm:false,
    closeForm:true,
    formNew:false,
    editForm:false,
    viewForm:false,
    newForm:false,
  }
}

export const formActionSlice = createSlice({
  name: 'formActions',
  initialState,
  reducers: {
    formOpen: (state, action) => {
      state.actions.openForm = true //always true
      state.actions.closeForm = false 
      state.actions.newForm = false
      state.actions.editForm = false  
      state.actions.viewForm = false        

    },
    formNew: (state, action) => {
      state.actions.newForm = true  
      // state.actions.openForm = true 
      state.actions.closeForm = false 
      state.actions.editForm = false  
      state.actions.viewForm = false  
    },
    formView: (state, action) => {
      state.actions.viewForm = true  
      // state.actions.openForm = false 
      state.actions.closeForm = false 
      state.actions.editForm = false  
      state.actions.newForm = false  

    },
    formEdit: (state, action) => {
      state.actions.editForm = true  
      // state.actions.openForm = false 
      state.actions.closeForm = false 
      state.actions.viewForm = false  
      state.actions.newForm = false  
    },
        
        
    formClose: (state, action) => {
      // Object.assign({}, state.actions, initialState )
      state.actions.viewForm = false
      state.actions.editForm = false
      state.actions.openForm = false
      state.actions.closeForm = true
      state.actions.newForm = false  

    },
  },
})

// Action creators are generated for each case reducer function
export const ifopenPersonForm  = (state) => state.formActions.actions.openForm  // to know Modal 'personForm' to open
export const ifNewPerson  = (state) =>  state.formActions.actions.newForm  // to know user in EDIT mode
export const ifEditPerson  = (state) => state.formActions.actions.editForm  // to know user in EDIT mode
export const ifViewPerson  = (state) => state.formActions.actions.viewForm  // to know user in EDIT mode


export const { formOpen, formNew,  formView, formEdit, formClose } = formActionSlice.actions
export default formActionSlice.reducer