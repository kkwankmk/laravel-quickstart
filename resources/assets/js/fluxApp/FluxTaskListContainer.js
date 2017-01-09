import React, { Component, PropTypes } from 'react';
import {Container} from 'flux/utils';
import TaskListStore from './stores/TaskListStore';

import ActionCreators from './actions/ActionCreators';

class FluxTaskListContainer extends Component {
  componentDidMount() {
    ActionCreators.getTasks();
  }

  render() {
    let content = this.props.children && React.cloneElement(this.props.children, {
      ready: this.state.storeState.ready,
      task_list: this.state.storeState.task_list,
      task_name: this.state.storeState.task_name,
      task_id: this.state.storeState.task_id,
      status: this.state.storeState.status,
      old_task_name: this.state.storeState.old_task_name,
    });

    return content;
  }
}

FluxTaskListContainer.getStores = () => ([TaskListStore]);
FluxTaskListContainer.calculateState = (prevState) => ({
  storeState: TaskListStore.getState()
});
export default Container.create(FluxTaskListContainer);