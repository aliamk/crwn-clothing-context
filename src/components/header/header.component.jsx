import React from 'react';
// import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux' //A HOC that lets us modify components to have access to things related to Redux
import { createStructuredSelector } from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selector'
import { selectCurrentUser } from '../../redux/user/user.selector'

import { ReactComponent as Logo } from '../../assets/crown.svg'
// import './header.styles.scss'

import { 
  HeaderContainer, 
  LogoContainer, 
  OptionsContainer, 
  OptionLink 
} from './header.styles'

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to='/shop'>CONTACT</OptionLink> 
      {
        currentUser ?
        <OptionLink as='div' onClick={ () => auth.signOut() }>SIGN OUT</OptionLink>
        :
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionsContainer>
    {
      hidden ? null :
    <CartDropdown />
    }
  </HeaderContainer>
)

/* Use the ternary operation to generate a SIGN OUT button if the user is signed in,
 and to return to a SIGN IN button when the user is signed out */

 /* Use a ternary operation to show and hide the cart drowdown menu */

// Advanced destructuring for nested values
// const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
//   currentUser,
//   hidden
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(
  mapStateToProps
  )(Header)