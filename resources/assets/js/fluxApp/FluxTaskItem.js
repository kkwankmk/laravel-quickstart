import React, {Component, PropTypes} from 'react';

import ActionCreators from './actions/ActionCreators';

class FluxTaskItem extends Component {

  render() {
    return (
      	<tr>
            <td className="table-text">
                <div>{this.props.name}</div>
            </td>
             <td className="table-text">
                <button className="btn btn-primary" onClick={this.editList.bind(this, this.props.id, this.props.name)}>Edit</button>
            </td>
            <td className="table-text">
                <button className="btn btn-danger" onClick={this.deleteList.bind(this, this.props.id, this.props.name)}>Delete</button>
            </td>
        </tr>
    );
  }

  deleteList(id, name){
    // console.log('delete -->', id);
    ActionCreators.deleteList(id, name);
  }
  editList(id, name){
    // console.log('edit -->', id, name);
    ActionCreators.editList(id, name);
    // var editState = {...this.state};
    // editState.task_name = name;
    // editState.status = false;
    // editState.task_id = id;
    // this.setState(editState);
  }
}


FluxTaskItem.propTypes = {
  name: PropTypes.string,

}

export default FluxTaskItem;

 
            