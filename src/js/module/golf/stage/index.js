import { connect } from 'react-redux';
import { addCard } from './module';

const mapStateToProps = (state) => {
  // const cardArr = state.get('cardArr');
  const cardArr = {};

  return cardArr;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => {
      dispatch(addCard(card))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Golf);
