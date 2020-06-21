import * as types from './ActionTypes'

export function addTodoAction(todo) {
  return dispatch => {
    return dispatch({ type: types.ADD_TODO, todo })
  }
}

export function deleteTodoAction(index, todo) {
  return dispatch => {
    return dispatch({ type: types.DELETE_TODO, index, todo })
  }
}

export function editTodoAction(index, todo) {
  return dispatch => {
    return dispatch({ type: types.EDIT_TODO, index, todo })
  }
}

export function confirmEditAction(index, todo) {
  return dispatch => {
    return dispatch({ type: types.CONFIRM_EDIT_TODO, index, todo })
  }
}

export function undoTodoAction() {
  return dispatch => {
    return dispatch({ type: types.UNDO_TODO})
  }
}
