import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

// import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selector'
import { toggleCartHidden } from '../../redux/cart/cart.actions.js'


import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));



/* import './cart-dropdown.styles.scss'

/* When user adds items to cart, map over the cartItems property array 
looking for ids of added items and display them in the cart dropdown 
/* If cart.length is equal to zero, render the empty-message span, if it's 
equal to more than zero then run the map function and render the cartItems
const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'> 
      {
        cartItems.length ? (
          cartItems.map(cartItem => ( 
          <CartItem 
          key={cartItem.id} 
          item={cartItem}
          />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton onClick={() => {
      history.push('/checkout')
      dispatch(toggleCartHidden())
      }}>
        GO TO CHECKOUT
    </CustomButton>
  </div>
)

// Tell App to look for state in cart-item and not in App.js
// Use Reselect to stop the cart dropdown re-rendering on every unrelated state change. 
/* const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
}) 

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

/* withRouter is a HOC function that will take the output from the connect function
for routing pages 
export default withRouter(connect(
  mapStateToProps
)(CartDropdown))

*/