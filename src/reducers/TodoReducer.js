import * as types from "../actions/ActionTypes";

const initialState = {
  todoList: [],
  lastDeleted: {},
  editTodo: {},
};

export default function (state = initialState, action) {
  // console.log(`action `, action);
  switch (action.type) {
    case types.ADD_TODO:
      return {
        ...state,
        todoList: state.todoList.concat(action.todo),
      };
    case types.DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((_, i) => i !== action.index),
        lastDeleted: { index: action.index, todo: action.todo },
      };
    case types.EDIT_TODO:
      return {
        ...state,
        editTodo: { index: action.index, todo: action.todo },
      };
    case types.UNDO_TODO:
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, state.lastDeleted.index),
          state.lastDeleted.todo,
          ...state.todoList.slice(
            state.lastDeleted.index,
            state.todoList.length
          ),
        ],
        lastDeleted: {},
      };
    case types.CONFIRM_EDIT_TODO:
      // console.log(
      //   `state.todoList.slice(0, state.lastDeleted.index)`,
      //   state.todoList.slice(0, state.lastDeleted.index)
      // );
      // console.log(` state.editTodo.todo`, state.editTodo.todo);
      // console.log(
      //   ` state.todoList.slice(
      //       state.editTodo.index + 1,
      //       state.todoList.length
      //     )`,
      //   state.todoList.slice(state.editTodo.index + 1, state.todoList.length)
      // );

      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, state.editTodo.index),
         action.todo,
          ...state.todoList.slice(
            state.editTodo.index + 1,
            state.todoList.length
          ),
        ],
        editTodo: {},
      };
    default:
      return state;
  }
}
