import React, { Component, PropTypes } from 'react';
import {Container} from 'flux/utils';
import TaskListStore from './stores/TaskListStore';

class FluxTaskListContainer extends Component {
  componentDidMount() {
  }

  render() {
    let content = this.props.children && React.cloneElement(this.props.children, {
      task_list: this.state.storeState.task_list,
      task_name: this.state.storeState.task_name,
      task_id: this.state.storeState.task_id,
      status: this.state.storeState.status,
    });

    return content;
  }
}

FluxTaskListContainer.getStores = () => ([TaskListStore]);
FluxTaskListContainer.calculateState = (prevState) => ({
  storeState: TaskListStore.getState()
});
export default Container.create(FluxTaskListContainer);