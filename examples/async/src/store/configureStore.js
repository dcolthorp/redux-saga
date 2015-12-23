import { createStore, applyMiddleware } from 'redux'
import sagaMiddleware from '../../../../src'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
import sagas from '../sagas'

function without(obj, prop) {
  const res = {...obj}
  delete res[prop]
  return res
}

function logMonitor(effect) {
  console.log(effect.type, without(effect, 'type'))
}


const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(sagas, logMonitor)
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  /*
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
  */
  return store
}
