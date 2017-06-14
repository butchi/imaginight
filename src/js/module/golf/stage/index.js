import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stageActionCreators } from './module';

const mapStateToProps = (state) => {
  // const cardArr = state.get('cardArr');
  const cardArr = {};

  return cardArr;
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(stageActionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Golf);
