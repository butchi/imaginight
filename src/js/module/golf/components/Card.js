import React from 'react';

import Complex from  '../../Complex';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        key={this.props.id}
        className="card"
        onClick={() => {this.handleClick()}}
        data-active={this.props.active ? 1 : 0}
      >
        <div className="hp">
          <i
            className="fa fa-bolt"
            aria-hidden="true"
            style={{
              width: '0.15rem',
              textAlign: 'center',
            }}>
          </i>
          {" POW: "}
          {Complex(this.props.hp).str}
        </div>
        <div
          className="map-hp"
          data-hp-real={Complex(this.props.hp).re}
          data-hp-imag={Complex(this.props.hp).im}
        >
          <div className="cur" />
        </div>
      </div>
    );
  }
}
