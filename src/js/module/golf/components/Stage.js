import React from 'react';

import Complex from '../../Complex';
import CMath from '../../CMath';

import Field from './Field';
import Stock from './Stock';
// import AddCard from '../containers/AddCard';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hp: [0,0],
    };
  }

  render() {
    return (
      <div>
        <Field />
        <Stock
          cardArr={[
            {
              id: 0,
              hp: [1,2],
            },
            {
              id: 1,
              hp: [2,3],
            },
          ]} />
      </div>
    );
  }
}
