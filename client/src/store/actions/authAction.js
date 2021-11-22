// 401 Wrong Password - node returns/ promise - Reject? 
// Better create axios serive  axios.creat() - Check doc
import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_START,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT
 } from './types'
 

 // ** LOGIN USER **//
 //** 04Feb -  */
 var returnvalue; 
export const loginStart = () => {
  return {
    type : LOGIN_START
  }
 }
 
 export const loginSucess = (data) => {
  return {
    type : LOGIN_SUCESS
  }
 }

 export const loginFail = (err) => {
  return {
    type : LOGIN_FAIL
  }
 }


 //***********/
 // payload -> user :{},token, message
 // err     -> user :{},token, message
 //***********/
 // This Action creator, contains function, that function returns a value as Action Object.
 // Here are we are delaying the dispatch'ing the 3 different actions based on the conditions 
export const loginUser = (name, password) => async dispatch => {
      
   returnvalue = dispatch({
    type : USER_LOADING,
  });
  console.log(returnvalue)
  const url ='./api/auth';
  const data = JSON.stringify({
    name,
    password
  })
  const config = {
    headers : {
      'content-type' : 'application/json'
    }
  }
  try {
    const res = await axios.post(url, data, config);
     returnvalue = dispatch({
      type : LOGIN_SUCESS,
      payload : res.data.message            // user :{},token, message
      // payload : res.data.message[0]      // user :{},token, message
    })                                      // here store the token in localStorage?
    //Both isAuth(true),isLoading(false) were set in authReducer,not found in payload
    console.log(returnvalue)
  } catch (err) {
    // console.log('catch error', err.response.data.error[0].msg)
    console.log(err)
    dispatch({
      type : LOGIN_FAIL,
    })
  }

 }

 export const logoutUser = () => dispatch => {
   console.log("inside logout action")
  dispatch({
    type : LOGOUT
  })   
 }



//  import { alertConstants } from '../_constants';
// * NICE FORMAT ****//
// export const alertActions = {
//     success,
//     error,
//     clear
// };

// function success(message) {
//     return { type: alertConstants.SUCCESS, message };
// }

// function error(message) {
//     return { type: alertConstants.ERROR, message };
// }

// function clear() {
//     return { type: alertConstants.CLEAR };
// }