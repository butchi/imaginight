import React from 'react';

import Card from './Card';

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cardArr } = this.props;

    return (
      <div className="stock">
        {cardArr.map(card =>
          <Card
            key={card.id}
            {...card}
            active={false}
            onCardClick={() => onCardClick(card.id)}
          />
        )}
      </div>
    );
  }
}
