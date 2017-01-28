import React from 'react';

export default class OperatorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(_evt) {
    this.setState({
      radio: this.props.operator,
    });

    this.props.onOperatorChange(this.props.operator);
  }

  render() {
    return (
      <label><input type="radio" name="operator" value={this.props.operator} checked={this.props.radio} onChange={(evt) => this.onChange(evt)} /> {this.props.operator}</label>
    );
  }
}
