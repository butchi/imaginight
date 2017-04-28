import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './module/golf/reducers';

import BattleStage from './module/battle/stage.jsx';
import GolfStage from './module/golf/components/Stage';

const store = createStore(reducer);

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
        <BattleStage charaLen={8} />
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
      <Provider store={store}>
        <div className="golf">
          <GolfStage />
        </div>
      </Provider>
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