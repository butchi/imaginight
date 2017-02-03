import React from 'react';

export default class CommandHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let commandElmArr = [];

    let attackArr = this.props.attackArr || [];

    attackArr.forEach((attack, index) => {
      commandElmArr.push(
        <div className="attack" key={index}>
          <div className="command">{attack.command.name}: {attack.command.desc || attack.command.func.desc}</div>
        </div>
      );
    });

    return (
      <div className="command-history">
        <div className="back" onClick={() => this.props.onBack()} style={{display: attackArr.length ? 'block' : 'none'}}><i className="fa fa-undo" aria-hidden="true" style={{cursor: 'pointer'}}></i></div>
        <div className="history">{commandElmArr}</div>
      </div>
    );
  }
}
