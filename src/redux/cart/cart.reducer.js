import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils'

// The cart dropdown needs to be hidden by default and set to 0/empty
const INITIAL_STATE = {
  hidden: true,
  cartItems: []
}

// 1. Keep the dropdown hidden unless the TOGGLE action is triggered
// 2. Keep the cart empty (default state) unless the action (AddToCart button) is triggered
// 2. 'state.cartItems, action.payload' = existing cart items and new cart items
/* 3. Filter over cartItems IDs, REMOVE 1 from an item's quantity if the IDs match */
/* 4. Filter over cartItems IDs, completely CLEAR the items that match
 and keep the ones that don't match the ID */
const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id!== action.payload.id)
      }
      default:
        return state
  }
}

export default cartReducer


/* Want to use a TOGGLE bc the cart dropdown is either in a true or false state
(either hidden or not hidden). Instead of passing in a value for our action,
we can pass a conditional boolean: if the hidden state is true (dropdown hidden),
then the action should make it false (not hidden) and vice versa.
*/