import React from 'react';
import Party from './party.jsx';

export default class Stage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="stage">
        <Party partyId="0" charaLen="4" />
        <Party partyId="1" charaLen="4" />
      </div>
    );
  }
}
