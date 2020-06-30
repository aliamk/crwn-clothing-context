import React from 'react';
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

/* This is the /SHOP page.  Data is being populated on this page */

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {

  
  state = {
      loading: true
    }
  
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')
    // collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot)
      this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        // console.log(collectionsMap)
        updateCollections(collectionsMap)
        this.setState({ loading: false })
      })
    // })
    // const { fetchCollectionsStart } = this.props
    // fetchCollectionsStart()
    }
  render() {
    const { match } = this.props 
    const { loading } = this.props
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          // component={CollectionsOverview}
          render = { (props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> }
        />
        <Route
          path={`${match.path}/:collectionId`}
          // component = {CollectionPage}
          render = { (props) => <CollectionPageWithSpinner isLoading={loading} {...props} /> }
        />
      </div>
    ) 
  }
}



const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

// CONVERTED TO CLASS COMPONENT IN ORDER TO TRANSFER SHOP_DATA TO FIREBASE USING COMPONENTDIDOUN
/*const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route 
      exact 
      path={`${ match.path }`}
      component={CollectionsOverview} />
    <Route 
      path={`${ match.path }/:collectionId`} 
      component={CollectionPage}/>
  </div>
)*/

export default connect(
  null,
  mapDispatchToProps
  )(ShopPage)

/* 
The first ROUTE goes to the Collections Overview component
The second ROUTE: Nested Routing: we want to only populate the categories page with 
the items that the user has clicked on i.e., only return hats when clicking hats
- To do this, we want to access the URL, specifically the string after shop
- If it says shop/jackets, we want the category page to be populated by only items 
within the jackets data so we use: path={`${ match.path }/:collectionId`}
*/ 