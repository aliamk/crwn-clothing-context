/* Want to use values instead of strings across the application
in order to keep code consistency and reduce errors (Assign the string 
'SET_CURRENT_USER' to a value). 

Export an OBJECT called UserActionTypes that will include
 the value that points to the string ... this is then imported
 into the userReducer.js and user.actions.js files as 
 UserActionTypes.SET_CURRENT_USER to remove duplicate strings */

export const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}