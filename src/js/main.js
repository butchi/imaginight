class Player {
  constructor(opt) {
    this.playerId = opt.playerId;
    this.unitIndex = opt.unitIndex;
    this.$unit = opt.$unit;
    this.playerIndex = opt.playerIndex;
    this.$elm = opt.$elm;

    this.job = opt.job;

    this.hp = parseComplex(opt.hp);
    this.power = parseComplex(opt.power);

    this.$elm.append(`<h2>${this.job}</h2>`);
    this.$elm.append(`<div class="hp">${this.hp.re}, ${this.hp.im}</div>`);
    this.$elm.append(`<div class="power">${this.power.re}, ${this.power.im}</div>`);
  }

  update() {
    ;
  }
}

window.Complex = class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
};

function parseComplex(str) {
  var tmp = str.split(',');
  var re = parseInt(tmp[0]);
  var im = parseInt(tmp[1]);
  return new Complex(re, im);
}

function clamp(x, max, min) {
  return Math.max(Math.min(x, max), min);
}

window.sum = function sum(c1, c2) {
  var re = clamp(c1.re + c2.re, 4, -4);
  var im = clamp(c1.im + c2.im, 4, -4);

  return new Complex(re, im);
};

window.sub = function sub(c1, c2) {
  var re = clamp(c1.re - c2.re, 4, -4);
  var im = clamp(c1.im - c2.im, 4, -4);

  return new Complex(re, im);
};

window.mult = function mult(c1, c2) {
  var re = clamp(c1.re * c2.re - c1.im * c2.im, 4, -4);
  var im = clamp(c1.re * c2.im + c2.re * c1.im, 4, -4);

  return new Complex(re, im);
};

window.licker = window.licker || {};
((ns) => {
  var playerArr = [];
  var playerId = 0;
  $('.unit').each((unitIndex, unitElm) => {
    $(unitElm).find('.player').each((playerIndex, playerElm) => {
      let $playerElm = $(playerElm);
      let job = $playerElm.attr('data-job');
      let hp = $playerElm.attr('data-hp');
      let power = $playerElm.attr('data-power');
      let operation = $playerElm.attr('data-operation');
      playerArr.push(new Player({
        playerId: playerId,
        unitIndex: unitIndex,
        $unit: $(unitElm),
        playerIndex: playerIndex,
        $elm: $playerElm,
        job: job,
        hp: hp,
        power: power,
      }));

      playerId++;
    });
  });
})(window.licker);