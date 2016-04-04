import Complex from './Complex';

function parseComplex(str) {
  var tmp = str.split(',');
  var re = parseInt(tmp[0]);
  var im = parseInt(tmp[1]);

  return Complex(re, im);
}

export default class Player {
  constructor(opt) {
    this.playerId = opt.playerId;
    this.partyIndex = opt.partyIndex;
    this.$party = opt.$party;
    this.playerIndex = opt.playerIndex;
    this.$elm = opt.$elm;

    this.job = opt.job;

    this.hp = parseComplex(opt.hp);
    this.operation = opt.operation;
    this.power = parseComplex(opt.power);
    this.isAlive = true;

    this.$elm.attr('data-player-id', this.playerId);
    this.$elm.attr('data-party-index', this.partyIndex);
    this.$elm.attr('data-player-index', this.playerIndex);

    this.$elm.append(`<h2>${this.job}</h2>`);
    this.$elm.append(`<div class="hp"></div>`);
    this.$elm.append(`<div class="power"></div>`);

    this.$mapHp = $(`<table class="map-hp"></table>`);
    this.$elm.append(this.$mapHp);

    for(let y = 4; y >= -4; y--) {
      let $row = $(`<tr></tr>`);
      this.$mapHp.append($row);
      for(let x = -4; x <= 4; x++) {
        let $cell = $(`<td class="cell" data-x="${x}" data-y="${y}"></td>`)
        $row.append($cell);
      }
    }

    this.update();
  }

  update() {
    if(this.isAlive) {
      this.$elm.attr('data-alive', 1);
    } else {
      this.$elm.attr('data-alive', 0);
    }

    this.$elm.find('.hp').text(`HP: (${this.hp.re}, ${this.hp.im})`);
    this.$elm.find('.power').text(`POW: ${this.operation}(${this.power.re}, ${this.power.im})`);

    this.$elm.find('.map-hp .cell')
    .removeClass('cur')
    .filter(`[data-x="${this.hp.re}"][data-y="${this.hp.im}"]`)
    .addClass('cur');
  }

  activate() {
    this.$elm.addClass('active');
    this.isActive = true;
  }

  disactivate() {
    this.$elm.removeClass('active');
    this.isActive = false;
  }
}