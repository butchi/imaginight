import CMath from '@/js/lib/cmath';
import Complex from '@/js/lib/complex';

function normalFunc(opts = {}) {
  let operator = opts.operator || '+';
  let power = opts.power || [0,0];

  let ret = (opts = {}) => {
    let target = opts.target;
    let attacker = opts.attacker;

    return commandLi.attack({
      target,
      attacker,
      condition: (() => {
        return !!target.alive;
      }),
      calc: () => arithmetic({
        operator,
        sourceVal: target.hp,
        actionVal: power,
      }),
    });
  };

  ret.desc = `${operator}(${power}) の作用`;

  return ret;
}

function specialFunc(opts = {}) {
  let condition = opts.condition;
  let calc = opts.calc;

  let ret = (opts = {}) => {
    let target = opts.target;
    let attacker = opts.attacker;

    return commandLi.attack({
      target,
      attacker,
      condition,
      calc,
    });
  };

  return ret;
}

function attack(opts = {}) {
  let target = opts.target;
  let attacker = opts.attacker;
  let condition = opts.condition || (() => {
    return true;
  });
  let calc = opts.calc || _.noop;

  if(condition({ target, attacker })) {
    return {
      hp: calc({ target, attacker }),
    };
  } else {
    return ({});
  }
}

function arithmetic(opts = {}) {
  let operator = opts.operator || '+';

  let sourceVal = opts.sourceVal || [0,0];
  let actionVal = opts.actionVal || [0,0];

  let func;

  if(!operator) {
  } else if(operator === '+') {
    func = CMath.sum;
  } else if(operator === '-') {
    func = CMath.sub;
  } else if(operator === '*') {
    func = CMath.mult;
  }

  let tmp = func(Complex(sourceVal), Complex(actionVal));

  let ret = [tmp.re, tmp.im];

  return ret;
}

const commandLi = {
  defaultAbility: {
    auto: {
      "id": 'auto',
      "type": 'default',
      "name": "オート",
      "func": specialFunc({
        calc: (opts) => {
          const hp = Complex(opts.target.hp);
          const re = hp.re;
          const im = hp.im;

          let tmp;

          if (Math.abs(re) > Math.abs(im)) {
            if (re === 0) {
              tmp = hp;
            } else if (re > 0) {
              tmp = CMath.sub(hp, Complex([1, 0]))
            } else if (re < 0) {
              tmp = CMath.sum(hp, Complex([1, 0]))
            }
          } else {
            if (im === 0) {
              tmp = hp;
            } else if (im > 0) {
              tmp = CMath.sub(hp, Complex([0, 1]))
            } else if (re < 0) {
              tmp = CMath.sum(hp, Complex([0, 1]))
            }
          }

          let ret = [tmp.re, tmp.im];
          return ret;
        },
      }),
    },
    left: {
      "id": 'left',
      "type": 'default',
      "name": "闘う",
      "func": normalFunc({
        "operator": '+',
        "power": [-1,0],
      }),
    },
    right: {
      "id": 'right',
      "type": 'default',
      "name": "癒す",
      "func": normalFunc({
        "operator": '+',
        "power": [1,0],
      }),
    },
    down: {
      "id": 'down',
      "type": 'default',
      "name": "呪う",
      "func": normalFunc({
        "operator": '+',
        "power": [0,-1],
      }),
    },
    up: {
      "id": 'up',
      "type": 'default',
      "name": "祈る",
      "func": normalFunc({
        "operator": '+',
        "power": [0,1],
      }),
    },
    restore: {
      "id": 'restore',
      "type": 'default',
      "name": "蘇生",
      "func": specialFunc({
        condition: (opts) => {
          return !opts.target.alive;
        },
        calc: () => { return [1,0]; },
      }),
    },
  },

  normalFunc,
  specialFunc,

  attack,

  arithmetic,
}

export default commandLi;