import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import rootReducer from './root-reducer'

/* All the values in the 'logger' array will be
spread into '...middlewares' as individual arguments */
const middlewares = []

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(
  rootReducer, 
  applyMiddleware(...middlewares)
)

// The PERSISTOR is a PERSISTED version of the store
export const persistor = persistStore(store)

export default { store, persistor };