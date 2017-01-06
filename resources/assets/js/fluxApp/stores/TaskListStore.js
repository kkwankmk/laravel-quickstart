import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {ReduceStore} from 'flux/utils';
import update from 'immutability-helper';
//import 'babel-polyfill';

function getId() {
  return new Date().valueOf();
}

class TaskListStore extends ReduceStore {
  getInitialState() {
    return {
      task_list: [],
      task_name: "",
      task_id: "",
      status: true
    };
  }

  getTaskIndex(id) {
    return this._state.task_list.findIndex((obj) => {return obj.id == id;});
  }

 reduce(state, action){
    console.log(action.type);

    switch (action.type) {
      case constants.UPDATE_TASK_NAME:
        return update(
          state, {
            task_name: {$set: action.payload.task_name}
          }
        );

      case constants.ADD_TASK:
        return update(
          state, {
            task_name: {$set: ""},
            task_list: {$push: [{id: getId(), name: action.payload.task_name}]}
          }
        );

      case constants.DELETE_LIST:
        return update(
          state, {
            task_list: {$splice: [[this.getTaskIndex(state, action.payload.id),1]]}
          }
        );  

      case constants.EDIT_LIST:
        return update(
          state, {
            task_name: {$set: action.payload.name},
            task_id: {$set: action.payload.id},
            status: {$set: false},
          }
        );   

      case constants.SAVE_EDIT_LIST:
        let taskIndex = this.getTaskIndex(action.payload.id);
        return update(
          state, {
            task_list: {
              [taskIndex]:
                {name: {$set: action.payload.name}
              }
            },
            task_name: {$set: ""},
            task_id: {$set: ""},
            status: {$set: true},
          }
        );

      default:
        console.log(state, '--->', 'state');
        return state;
    }
    
 }
}

export default new TaskListStore(AppDispatcher);