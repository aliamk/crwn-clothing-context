import React from 'react'

import './cart-item.styles.scss'

/*
When user clicks on Add To Cart buttons, the relevant items need to 
appear within the cart dropdown menu including the following properties:
item image, price, name, quantity. 

A functional component which destructures off those properties 
that we need from 'item' 
*/
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='name'>
        {quantity} x ${price} 
      </span>
    </div>
  </div>
)

export default CartItem