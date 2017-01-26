import React from 'react';
import ReactDOM from 'react-dom';
import Stage from './module/stage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(event) {
    this.setState({
    });
  }
  render() {
    return (
      <div className="app">
        <Stage />
      </div>
    );
  }
}

// app クラスを描画
ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
