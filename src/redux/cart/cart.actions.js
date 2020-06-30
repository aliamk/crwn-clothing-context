import CartActionTypes from './cart.types'

// Toggle the hidden value of the cart's dropdown menu
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
})

/* Add 1 instance of the item clicked on */
export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
})

// Remove/reduce an instance of an item in the cart by 1
export const removeItem = item => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})

// Clear all instances of a particular item from the cart
export const clearItemFromCart = item => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
})