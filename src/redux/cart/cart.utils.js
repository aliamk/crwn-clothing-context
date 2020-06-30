/*  UTILITY FUNCTIONS - allow files to be kept tidy 
and for functions that are needed in many files to be 
kept in one location.  


ADD ITEM TO CART
Does the newly added item's id match an exisiting item's id
(is existingCartItem true)?

If true, map over existingCartItems in order to generate a 
new array, check for id match again, if true again,
return existing item and increase the quantity value by 1

If the ids don't match, just return the existing cart item and make
no change (an error)

If existingCartItem is false (if .find doesn't match cartItem.id to cartItemToAdd.id), 
then skip the IF block and return a new array containing the previously 
added items and the new item but give it a base quantity of 1
*/
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => 
    cartItem.id === cartItemToAdd.id
    )
    if (existingCartItem) {
      return cartItems.map(cartItem => 
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
        )
    }
    return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ]
} 

/* REMOVE ITEM FROM CART (clicking on the left arrow on the checkout page)
Does the item to be removed match an existing item's ID
(is existingCartItem true)?  If true, move to the IF block.

If the quantity of existingCartItems is equal to 1, keep items with IDs 
that DO NOT MATCH and filter out/remove from checkout the ones that do 
(remove that item from the checkout display because now the user is saying 
they don't want any of that item, of which there was only 1). 

If quantity of existingCartItems is NOT equal to 1 (so there's more than 
one of the same item in the cart), skip the rest of the IF block and map 
over cartItems, when an ID matches, subtract one from that item's quantity.
*/

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  )
  if(existingCartItem.quantity === 1) {
    return cartItems.filter(
      cartItem => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map(
    cartItem =>
    cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
}