import firebase from 'firebase/app'
import 'firebase/firestore' // for the database
import 'firebase/auth'  // for the authorisation

const config = {
  apiKey: "AIzaSyCE8o3gtPNquPCj89EfRlgbVlCtEChYQSk",
  authDomain: "crwn-db-949da.firebaseapp.com",
  databaseURL: "https://crwn-db-949da.firebaseio.com",
  projectId: "crwn-db-949da",
  storageBucket: "crwn-db-949da.appspot.com",
  messagingSenderId: "703367615173",
  appId: "1:703367615173:web:4b8686cc8be509b48dd6ac",
  measurementId: "G-XSCE9G9LR6"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return; // if NULL is returned (user not signed in), exit function
  const userRef = firestore.doc(`users/${ userAuth.uid }`) 
  
  /* This will produce the EXISTS property + will check if the authenticated user already 
  exists in the database */
  const snapShot = await userRef.get() 

  if( !snapShot.exists ) {
    const { displayName, email } = userAuth // If snapshot is false (user is not saved in database), then create it
    const createdAt = new Date()

    try {
      await userRef.set({ // Create the user (a new document) in the database
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
        console.log( 'error creating user', error.message )
    }
  }
  return userRef
}

// ADD SHOP DATA TO FIREBASE AS A BATCH-WRITE
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  // console.log(collectionRef)
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    // console.log(newDocRef)
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()), // JS method - pass it a string and it'll return a string where any charatchers that can't be handled by a URL process (spaces etc) will be converted into readable characters
      id: doc.id, 
      title,
      items
    }
  })
  // console.log(transformedCollection)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase