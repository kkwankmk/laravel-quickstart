import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import {ReduceStore} from 'flux/utils';
import update from 'immutability-helper';
//import 'babel-polyfill';

class TaskListStore extends ReduceStore {
  getInitialState() {
    return {
      ready: false,
      task_list: [],
      task_name: "",
      old_task_name: "",
      task_id: "",
      status: true
    };
  }

  getTaskIndex(id) {
    return this._state.task_list.findIndex((obj) => {return obj.id == id;});
  }

 reduce(state, action){
    console.log(action.type);
    let taskIndex = null;

    switch (action.type) {
      case constants.GET_TASK_SUCCESS:
        return update(
          state, {
            ready: {$set: true},
            task_list: {$set: action.payload.response},
          }
        );

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
            task_list: {$push: [{id: action.payload.task_id, name: action.payload.task_name}]}
          }
        );

      case constants.ADD_TASK_SUCCESS:
        // update task_id with server task_id
        
        console.log(action.payload.response.id,action.payload.task_id);
        taskIndex = this.getTaskIndex(action.payload.task_id);
        
        return update(state, {
          task_list: {
            [taskIndex]:
              {id: {$set: action.payload.response.id}
            }
          }
        });
        
      case constants.ADD_TASK_ERROR:
        // remove task id: action.payload.task_id from task_list 
        taskIndex = this.getTaskIndex(action.payload.task_id);
        return update(
          state, {
            task_list: {$splice: [[taskIndex,1]]}
          }
        );  

      case constants.DELETE_LIST:
        return update(
          state, {
            task_list: {$splice: [[this.getTaskIndex(state, action.payload.id),1]]}
          }
        );  

      case constants.DELETE_LIST_ERROR:
        return update(
          state, {
            task_list: {$push: [{id: action.payload.id, name: action.payload.name}]}
          }
        );  


      case constants.EDIT_LIST:
      console.log(action.payload.id);
        return update(
          state, {
            task_name: {$set: action.payload.name},
            task_id: {$set: action.payload.id},
            status: {$set: false},
          }
        );   

      case constants.SAVE_EDIT_LIST:
        taskIndex = this.getTaskIndex(action.payload.id);
        return update(
          state, {
            old_task_name: {$set: state.task_list[taskIndex].name},
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

      case constants.SAVE_EDIT_LIST_SUCCESS:  
        return update(
          state, {
            old_task_name: {$set: ""},
          }
        );    

      case constants.SAVE_EDIT_LIST_ERROR:
        console.log(state.old_task_name,action.payload.id);
        taskIndex = this.getTaskIndex(action.payload.id);
        return update(
          state, {
            task_list: {
              [taskIndex]:
                {name: {$set: state.old_task_name}
              }
            },
            old_task_name: {$set: ""},
            task_name: {$set: ""},
            task_id: {$set: ""},
            status: {$set: true},
          }
        );

      default:
        return state;
    }
  }
}

export default new TaskListStore(AppDispatcher);