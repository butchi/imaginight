// React をロード
import React from 'react';
import ReactDOM from 'react-dom';
// 外部ファイルへ分割した Message クラスをロード
import Message from './message.jsx';

// このアプリケーションのメインとなる App クラス
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '山田'
    }
  }
  handleChange(event) {
    this.setState({
      name: event.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.name} onChange={this.handleChange.bind(this)} />
        <Message name={this.state.name} />
      </div>
    );
  }
}

// app クラスを描画
ReactDOM.render(
  <App />,
  document.getElementById('container')
);
