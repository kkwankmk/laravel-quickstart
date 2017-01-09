import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import Util from '../Util';

import TaskApi from '../api/TaskApi';

let ActionCreators = {

  getTasks() {
    AppDispatcher.dispatchAsync(TaskApi.getTasks(), {
      request: constants.GET_TASK,
      success: constants.GET_TASK_SUCCESS,
      failure: constants.GET_TASK_ERROR
    });
  },

  updateTaskName(task_name) {
    AppDispatcher.dispatch({
      type: constants.UPDATE_TASK_NAME,
      payload: {task_name}
    });
  },

  addTask(task_name) {
    let task_id = Util.getId();
    AppDispatcher.dispatchAsync(TaskApi.addTask(task_name), {
      request: constants.ADD_TASK,
      success: constants.ADD_TASK_SUCCESS,
      failure: constants.ADD_TASK_ERROR
    }, {task_id, task_name});
  },

  deleteList(id, name) {
    AppDispatcher.dispatchAsync(TaskApi.deleteList(id), {
      request: constants.DELETE_LIST,
      success: constants.DELETE_LIST_SUCCESS,
      failure: constants.DELETE_LIST_ERROR
    }, {id, name});
  },

  editList(id, name) {
    AppDispatcher.dispatch({
      type: constants.EDIT_LIST,
      payload: {id, name}
    });
  },

  saveEditList(id, name) {
    AppDispatcher.dispatchAsync(TaskApi.saveEditList(id, name), {
      request: constants.SAVE_EDIT_LIST,
      success: constants.SAVE_EDIT_LIST_SUCCESS,
      failure: constants.SAVE_EDIT_LIST_ERROR
    }, {id, name});
  },
};

export default ActionCreators;