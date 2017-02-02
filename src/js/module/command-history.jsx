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
      <div className="command-history">{commandElmArr}</div>
    );
  }
}
