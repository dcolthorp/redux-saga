import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import sagaMiddleware from '../../../../src'

import reducer from '../reducers'
import sagas from '../sagas'

function without(obj, prop) {
  const res = {...obj}
  delete res[prop]
  return res
}

function logMonitor(effect) {
  console.log(effect.type, without(effect, 'type'))
}

const createStoreWithSaga = applyMiddleware(
  sagaMiddleware(sagas, logMonitor)
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithSaga(reducer, initialState)
}
