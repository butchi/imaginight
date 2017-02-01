const CharacterLi = [
  {
    name: "Knight",
    hp: [4,0],
    job: "knight",
    special: {
      name: "稲妻突き",
      operator: '-',
      power: [2,0],
    }
  },
  {
    name: "Dark Knight",
    hp: [-4,0],
    job: "darkknight",
    special: {
      name: "暗黒剣",
      operator: '-',
      power: [2,0],
    }
  },
  {
    name: "Magician",
    hp: [0,3],
    job: "magician",
    special: {
      name: "属性変化",
      operator: '*',
      power: [0,1],
    }
  },
  {
    name: "Healer",
    hp: [3,0],
    job: "healer",
    special: {
      name: "回復",
      operator: '+',
      power: [1,0],
    }
  },
];

export default CharacterLi;