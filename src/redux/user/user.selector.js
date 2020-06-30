import { createSelector } from 'reselect'

/* Memoizing the userReducer so the signed-in user state isn't 
re-rendered when other components' states are modified */

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)