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
    name: "ダークナイト",
    hp: [-4,0],
    job: "Dark Knight",
    special: {
      name: "暗黒剣",
      func: normalFunc({
        operator: '-',
        power: [2,0],
      }),
    },
  },
  {
    name: "魔道士",
    hp: [0,3],
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
];

export default CharacterLi;