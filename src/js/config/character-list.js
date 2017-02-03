import Complex from '../module/Complex';
import CMath from '../module/CMath';
import CommandLi from '../module/command-list';

const normalFunc = CommandLi.normalFunc;
const specialFunc = CommandLi.specialFunc;

const CharacterLi = [
  {
    name: "ナイト",
    hp: [4,0],
    job: "Knight",
    special: {
      name: "剣技",
      func: normalFunc({
        operator: '-',
        power: [2,0],
      }),
    },
  },
  {
    name: "イマジナイト",
    hp: [3,2],
    job: "Imagiknight",
    special: {
      name: "斜め切り",
      func: normalFunc({
        operator: '-',
        power: [2,2],
      }),
    },
  },
  {
    name: "ダークナイト",
    hp: [-4,0],
    job: "Dark Knight",
    special: {
      name: "暗黒剣",
      func: normalFunc({
        operator: '-',
        power: [3,0],
      }),
    },
  },
  {
    name: "魔道士",
    hp: [3,0],
    job: "Magician",
    special: {
      name: "属性変化",
      func: normalFunc({
        operator: '*',
        power: [0,1],
      }),
    },
  },
  {
    name: "暗黒魔道士",
    hp: [-3,0],
    job: "Black Mage",
    special: {
      name: "属性逆変化",
      func: normalFunc({
        operator: '*',
        power: [0,-1],
      }),
    },
  },
  {
    name: "道化師",
    hp: [2,1],
    job: "Joker",
    special: {
      name: "変身",
      func: normalFunc({
        operator: '*',
        power: [1,2],
      }),
    },
  },
  {
    name: "ヒーラー",
    hp: [3,0],
    job: "Healer",
    special: {
      name: "超回復",
      func: normalFunc({
        operator: '+',
        power: [2,0],
      }),
    },
  },
  {
    name: "神官",
    hp: [2,0],
    job: "Priest",
    special: {
      name: "完全蘇生",
      func: specialFunc({
        condition: (opts) => {
          return !opts.target.alive;
        },
        calc: () => { return [4,0]; },
      }),
      desc: '戦闘不能のHPを(4,0)にする',
    }
  },
  {
    name: "ゴースト",
    hp: [0,-3],
    job: "Ghost",
    special: {
      name: "怨念",
      func: normalFunc({
        operator: '-',
        power: [2,0],
      }),
    },
  },
  {
    name: "悪魔",
    hp: [0,-4],
    job: "Devil",
    special: {
      name: "投獄",
      func: normalFunc({
        operator: '-',
        power: [3,0],
      }),
    },
  },
  {
    name: "大天使",
    hp: [0,4],
    job: "Angel",
    special: {
      name: "祝福",
      func: normalFunc({
        operator: '+',
        power: [2,0],
      }),
    },
  },
];

export default CharacterLi;