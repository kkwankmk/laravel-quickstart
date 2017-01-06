import React, {Component} from 'react';
import {render} from 'react-dom';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {counter: 1};
  }

  handleOnClick(e) {
    e.preventDefault();
    let newCounter = this.state.counter + 1;
    this.setState({counter: newCounter});
  }

  render() {
    return (
    	<div>
    		<h1>Hello, {this.props.name} {this.state.counter}</h1>
    		<button onClick={this.handleOnClick.bind(this)}>Click</button>
    	</div>
    );
  }
}

let name = "Sammy";

//<Welcome name={name} />

function getId() {
	return new Date().valueOf();
}

class TaskItem extends Component {

	render() {
		return(
            <tr>
                <td className="table-text">
                    <div>{this.props.name}</div>
                </td>
                <td className="table-text">
                    <button className="btn btn-primary" onClick={this.props.onEdit.bind(this, this.props.id, this.props.name)}>Edit</button>
                </td>
                <td className="table-text">
                    <button className="btn btn-danger" onClick={this.props.onDelete.bind(this)}>Delete</button>
                </td>
            </tr>
	    );
	}
}


class TaskList extends Component {
  	constructor(props) {
	    super(props);
	    this.state = {task_list: [], task_name: "", task_id: "", status: true};
  	}

  	deleteList(id){
  		var state = this.state.task_list;
  		var index =  state.indexOf(id);
  		state.splice(index, 1);
		this.setState(state);
	}

	editList(id, name){
		var editState = {...this.state};
		editState.task_name = name;
		editState.status = false;
		editState.task_id = id;
		this.setState(editState);
	}

  	handleOnClick(e) {
	    e.preventDefault();
	    var newState = {...this.state};
	    console.log(newState,'-->');
	    if (newState.status == false) {
	    	let taskIndex = newState.task_list.findIndex((obj) => {return obj.id == newState.task_id;});
	    	newState.task_list[taskIndex].name = newState.task_name;
	    	/*
	    	for (var i=0; i < state.length ; ++i)
		       	if(state[i].id == newState.task_id){
		       		state[i].name = newState.task_name;
		       	}
		       	*/
	    } else {
		    if (newState.task_name == "") {
		    	alert('The name field is required.');
		    } else {
				newState.task_list.push({id: getId(), name: newState.task_name});
		    }
	    }
	    newState.task_name = "";
	    newState.task_id = "";
		newState.status = true;
		this.setState(newState);
  	}

  	handleChange(event){
	  	var newState = {...this.state};
	  	newState.task_name = event.target.value;
	    this.setState(newState);
  	}

  	getTaskList() {
	  	if (this.state.task_list.length == 0) {
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
							{this.state.task_list.map(function(obj) {
								return <TaskItem key={obj.id.toString()} id={obj.id} name={obj.name} onDelete={this.deleteList.bind(this, obj.id)} onEdit={this.editList.bind(this)}/>;
							}.bind(this))}
						</tbody>
	                </table>
	            </div>
	        </div>
  		);
	  }


  render() {
  	//console.log(this.state); 

    return (
    	<div>
    		<form className="form-horizontal">
	            <div className="form-group">
	                <label htmlFor="task-name" className="col-sm-3 control-label">Tasks</label>
                    <div className="col-sm-6">
                    	<input type="text" className="form-control" id="name" value={this.state.task_name} onChange={this.handleChange.bind(this)} />
                    </div>
	            </div>
	            <div className="form-group">
	            	<div className="col-sm-offset-3 col-sm-6">

	            		<button className="btn btn-default" onClick={this.handleOnClick.bind(this)}>
	            		{this.state.status ? 'Add Task' : 'Edit Task'}</button>
	            		
	            	</div>
	            </div>
	        </form>
	        {this.getTaskList()}
    	</div>
    );
  }
}

render(
  <TaskList />,
  document.getElementById('root')
);