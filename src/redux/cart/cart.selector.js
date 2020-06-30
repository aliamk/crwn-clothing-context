import { createSelector } from 'reselect'

// In order to MEMOIZE the cart's quantity property (or the value of any property)

/* 
Two types of selector:  INPUT SELECTOR and OUTPUT SELECTOR
INPUT SELECTOR: Takes the whole state and returns slices of it 
(that can be accessed in the output's createSelector). 
OUTPUT SELECTOR:  Two arguments go into createSelector (an array of input selectors
  OR other output selectors and a function that returns the value u want from the 
  selector) 
  */


// INPUT
const selectCart = state => state.cart


// OUTPUT SELECTORS

export const selectCartItems = createSelector(
  [selectCart],           // Argument one: input selector
  (cart) => cart.cartItems // Argument two:cartReducer
)

export const selectCartHidden = createSelector(
  [selectCart],           // Argument one: input selector
  (cart) => cart.hidden  // Argument two: cartReducer
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],    // Argument one: output selector
  (cartItems) =>          // Argument two: cartReducer > cartItems
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity,
      0
    )
)

// Tallying the items in cartItems and displaying in /checkout (checkout.component.jsx)
export const selectCartTotal = createSelector(
  [selectCartItems],    // Argument one: output selector
  (cartItems) =>          // Argument two: cartReducer > cartItems
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => 
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
)
