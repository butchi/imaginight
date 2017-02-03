import React from 'react';

export default class CommandIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let commandElmArr = [];

    this.props.characterLi.forEach((chara, index) => {
      commandElmArr.push(
        <div className="command" key={index}>
          <div className="job">{chara.job}</div>
          <div className="desc">{chara.special.name}: {chara.special.desc || chara.special.func.desc}</div>
        </div>
      );
    });

    return (
      <div className="command-index">{commandElmArr}</div>
    );
  }
}
