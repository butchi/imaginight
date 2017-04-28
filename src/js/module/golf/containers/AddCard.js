import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';

let AddCard = ({ dispatch }) => {
  return (
    <div className="add-card">
      <form onSubmit={evt => {
        evt.preventDefault();
        dispatch(addCard({
          hp: [2,3],
        }))
      }}>
        <button type="submit">
          チャージ
        </button>
      </form>
    </div>
  )
}
AddCard = connect()(AddCard);

export default AddCard;
