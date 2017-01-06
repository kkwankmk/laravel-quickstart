import React, {Component, PropTypes} from 'react';

import ActionCreators from './actions/ActionCreators';

import FluxTaskItem from './FluxTaskItem';

class FluxTaskListApp extends Component {

  render() {
    return (
    	<div>
        <form className="form-horizontal">
              <div className="form-group">
                  <label htmlFor="task-name" className="col-sm-3 control-label">Tasks</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control" id="name" value={this.props.task_name} onChange={this.handleChange.bind(this)} />
                    </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-6">
                  <button type="button" className="btn btn-default" onClick={this.handleOnClick.bind(this)}>
                  {this.props.status ? 'Add Task' : 'Edit Task'}</button>      
                </div>
              </div>
          </form>
          {this.getTaskList()}
      </div>
    );
  }

  getTaskList() {
    if (this.props.task_list.length == 0) {
      return null;
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
            Current Tasks
        </div>
        <div className="panel-body">
          <table className="table table-striped task-table">
            <thead>
              <tr>
                  <th>Tasks</th>
                </tr>
            </thead>

            <tbody>
              {this.props.task_list.map(function(obj) {
                return <FluxTaskItem key={obj.id.toString()} id={obj.id} name={obj.name} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  handleOnClick(e) {
    // console.log("handleOnClick");
    let task_name = this.props.task_name;
    if (this.props.status == false) {
      ActionCreators.saveEditList(this.props.task_id, task_name);
      // console.log('ssssss');
    } else {
      if (task_name == "") {
        alert('The name field is required.');
      } else {
        ActionCreators.addTask(task_name);
    } 
    }
    
  }

  handleChange(event) {
    // console.log("handleChange");
    ActionCreators.updateTaskName(event.target.value);
  }
}

FluxTaskListApp.propTypes = {
  task_list: PropTypes.array,
  task_name: PropTypes.string,
  task_id: PropTypes.string,
  status: PropTypes.bool,
}

export default FluxTaskListApp;