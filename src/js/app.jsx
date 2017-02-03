import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Stage from './module/stage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    location.replace('/battle/');
  }

  render() {
    return (
      <div className="app" />
    );
  }
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.setState({
    });
  }

  render() {
    return (
      <div className="battle">
        <Stage charaLen={8} />
      </div>
    );
  }
}

class Golf extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.setState({
    });
  }

  render() {
    return (
      <div className="battle" />
    );
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/battle/" component={Battle} />
    <Route path="/golf/" component={Golf} />
  </Router>
), document.querySelector('.container'))