import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import WelcomeApp from './WelcomeApp';
import TaskListApp from './TaskListApp';

import FluxTaskListContainer from './fluxApp/FluxTaskListContainer';
import FluxTaskListApp from './fluxApp/FluxTaskListApp';

render((
  <Router history={browserHistory}>
    <Route path="/welcome" component={WelcomeApp} />
    <Route path="/react_tasks" component={TaskListApp} />
    <Route component={FluxTaskListContainer}>
        <Route path="/flux_tasks" component={FluxTaskListApp} />
    </Route>
  </Router>
), document.getElementById('root'));