import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'

import { auth, createUserProfileDocument /*addCollectionAndDocuments*/ } from './firebase/firebase.utils'

import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'


class App extends React.Component {
  
  unsubscribeFromAuth = null  // To prevent memory leaks, we need to open and close the subscription

  componentDidMount() {
    const {  setCurrentUser /*collectionsArray*/ } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // firebase allows us to use their auth library methods instead of fetch
      if (userAuth) {   // if user signs-in validly
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {  // return a snapshot of either the existing user in the db
          setCurrentUser({                // or details of the new user 
            id: snapShot.id,
            ...snapShot.data()
          })
          // console.log(this.state)
        })
      } 
      setCurrentUser( userAuth )
      /*addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })))*/
      
      createUserProfileDocument(userAuth)
      // console.log(user)
    })  
  }

  componentWillUnmount() {  // Close the subscription
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
      <Header/>
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route exact path='/checkout' component={ CheckoutPage } />
          <Route 
            exact path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                < SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

/* RENDER is a JS invocation, allows us to use JS in place of component,
determines which component to return: If this.props.currentUser is true, 
redirect to the homepage; if false then redirect to sign-in page */

/* redux: this function tells the app to look to the userReducer for 
information on state changes instead of App.js */

/* Redirect a signed-in user away from the sign-in page by getting access
to this.props.currentUser */

/* Added mapStateToProps in App.js because all routing to and from pages
happens on the app component */

// ({ user }) "Destructure off our userReducer"
/* const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})  */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  /*collectionsArray: selectCollectionsForPreview*/

})

/* Dispatch assumes that every object that it receives 
is an action and passes it on to the reducers */

/* When a user signs-in, the user info is dispatched to the reducers via 
user.action and updates the state from null to the user */
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps /*this would be null if not for the sign-in redirect*/, 
  mapDispatchToProps 
)(App);
