import AppDispatcher from '../AppDispatcher';
import constants from '../constants';

let ActionCreators = {

  updateTaskName(task_name) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_TASK_NAME,
      payload: {task_name}
    });
  },

  addTask(task_name) {
    AppDispatcher.dispatch({
      type: constants.ADD_TASK,
      payload: {task_name}
    });
  },

  deleteList(id) {
    AppDispatcher.dispatch({
      type: constants.DELETE_LIST,
      payload: {id}
    });
  },

  editList(id, name) {
    AppDispatcher.dispatch({
      type: constants.EDIT_LIST,
      payload: {id, name}
    });
  },

  saveEditList(id, name) {
    AppDispatcher.dispatch({
        type: constants.SAVE_EDIT_LIST,
        payload: {id, name}
      });
    },

};

export default ActionCreators;