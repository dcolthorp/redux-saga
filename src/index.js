import { noop, is, remove } from './utils'
import proc from './proc'
export { take, put, race, call, cps, fork, join } from './io'
import { actionDispatched } from './monitorActions'

export const SAGA_NOT_A_GENERATOR_ERROR = "Saga must be a Generator function"

export default (sagas, monitors = []) => ({getState, dispatch}) => {

  const cbs = []
  sagas = is.array(sagas) ? sagas : [sagas]
  monitors = is.array(monitors) ? monitors : [monitors]
  runAllSagas()

  return next => action => {
    monitors.forEach( m => m(actionDispatched(action)) )
    const result = next(action) // hit reducers
    cbs.forEach(cb => cb(action))
    return result;
  }

  function runAllSagas() {
    sagas.forEach( saga => {
      if( !is.generator(saga) )
        throw new Error(SAGA_NOT_A_GENERATOR_ERROR)

      proc(
        saga(getState),
        subscribe,
        dispatch,
        0,
        dispatchEffectToMonitors,
        saga.name,
        []
      )
    })
  }

  function dispatchEffectToMonitors(effect) {
    monitors.forEach(m => m(effect))
  }

  function subscribe(cb) {
    cbs.push(cb)
    return () => remove(cbs, cb)
  }
}
