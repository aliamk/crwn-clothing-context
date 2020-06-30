// function returns an object with a type that matches the userReducer's
/* setCurrentUser takes USER as the object and returns the ACTION that 
   can be used by 'mapDispatchToProps in App.js in order to communicate
  the action to the reducers */

  import { UserActionTypes } from './user.types'


export const setCurrentUser = user => ({ 
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user   
 })