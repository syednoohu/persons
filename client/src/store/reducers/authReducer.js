import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCESS,
  LOGIN_FAIL,
  LOGOUT
 } from '../actions/types';

const initialState = {
  isAuth    : false,
  isLoading : true,
  token     : null,     // make token as property in the user object
  user      : {}        // need error Object?
};   

//Reducer MUST BE PURE functions,  i.e., Output of reducers must depends only on its INPUT(parameters) 

const authReducer = (authtState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADING:
      console.log('You Hit here too, i.e Two reducers activated')

      return {
        ...authtState, 
        isLoading : true,
      };
    // case USER_LOADED:
    //   return {
    //     ...authtState, 
    //     token     : 'What??',
    //     isAuth    : true,
    //     isLoading : false,
    //     user      : payload
    //   };
      case LOGIN_SUCESS:
        return {
          ...authtState, 
          ...payload,         // payload = { user :{}, token}
          isAuth    : true,
          isLoading : false
        }; 
    case LOGIN_FAIL:
      console.log(type)
      return {
        ...authtState, 
        token     : null,
        isAuth    : false,
        isLoading : false,
        user      : {}  
      };
    case LOGOUT:
      // here remove the token/user from localStorage
      console.log("LOGOUT SUCESS")
      return {
        ...authtState, 
        test: "test",
        token     : null,
        isAuth    : false,
        isLoading : false,
        user      : {}  
      };      
    default:

      return authtState;
      
  }
}

export default authReducer;