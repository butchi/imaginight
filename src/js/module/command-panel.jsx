import React from 'react';

export default class CommandPanel extends React.Component {
  constructor(props) {
    super(props);

    this.commandLi = _.clone(this.props.ability);

    this.state = {
      command: {
        id: 'special',
      },
    };
  }

  handleChange(key) {
    this.commandLi.special = _.clone(this.props.special);
    this.commandLi.special.id = 'special';

    this.setState({
      command: this.commandLi[key],
    });

    this.props.onCommand(this.commandLi[key]);
  }

  render() {
    let commandElmArr = [];
    let index = 0;

    Object.keys(this.props.ability).forEach((key) => {
      let command = this.props.ability[key];
      commandElmArr.push(<label key={index + 1}><input type="radio" ref="command" value={key} checked={this.state.command.id === key} onChange={() => this.handleChange(key)} /> {command.name}</label>);

      index++;
    });

    return (
      <div className="command-panel">
        {commandElmArr}
        <label key={0}><input type="radio" ref="command" value="special" checked={this.state.command.id === 'special'} onChange={() => this.handleChange('special')} /> {this.props.special.name}</label>
        <div>{this.props.special.name}: {this.props.special.desc}</div>
      </div>
    );
  }
}
