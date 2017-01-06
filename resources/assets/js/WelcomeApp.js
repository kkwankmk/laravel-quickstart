import React, {Component} from 'react';
import {render} from 'react-dom';

class WelcomeApp extends Component {
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
    		<h1>Hello, {this.state.counter}</h1>
    		<button onClick={this.handleOnClick.bind(this)}>Click</button>
    	</div>
    );
  }
}

export default WelcomeApp;