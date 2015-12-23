
export const ACTION_DISPATCHED = 'ACTION_DISPATCHED'

export const SAGA_STARTED = 'SAGA_STARTED'
export const SAGA_TERMINATED = 'SAGA_TERMINATED'
export const SAGA_ABORTED = 'SAGA_TERMINATED'

export const EFFECT_TRIGGERED = 'EFFECT_TRIGGERED'
export const EFFECT_RESOLVED = 'EFFECT_RESOLVED'
export const EFFECT_REJECTED = 'EFFECT_REJECTED'

export function actionDispatched(action) {
  return {
    type: ACTION_DISPATCHED,
    action
  }
}

export function sagaStarted(name, args, id, parentId) {
  return {
    type: SAGA_STARTED,
    name, args, id, parentId
  }
}

export function sagaTerminated(id, result) {
  return {
    type: SAGA_TERMINATED,
    id, result
  }
}

export function sagaAborted(id, error) {
  return {
    type: SAGA_ABORTED,
    id, error
  }
}

export function effectTriggered(taskId, effectId, effectDesc) {
  return {
    type: EFFECT_TRIGGERED,
    taskId, effectId, effectDesc
  }
}

export function effectResolved(id, result) {
  return {
    type: EFFECT_RESOLVED,
    id, result
  }
}

export function effectRejected(id, error) {
  return {
    type: EFFECT_REJECTED,
    id, error
  }
}
