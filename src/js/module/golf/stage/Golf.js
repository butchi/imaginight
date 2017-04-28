import React, { Component } from 'react';

class AddCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="add-card">
        <form onSubmit={evt => {
          evt.preventDefault();
          this.props.addCard({
            hp: [2,3],
          });
        }}>
          <button type="submit">
            チャージ
          </button>
        </form>
      </div>
    );
  }
}
