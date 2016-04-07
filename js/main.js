(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('./module/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Complex = require('./module/Complex');

var _Complex2 = _interopRequireDefault(_Complex);

var _CMath = require('./module/CMath');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var phaseLi = {
  SELECT: 'select',
  ATTACK: 'attack'
};

var MainController = function () {
  function MainController() {
    var _this = this;

    _classCallCheck(this, MainController);

    this.partyArr = [];
    this.playerArr = [];
    var playerId = 0;

    this.$stage = $('.stage');

    this.$stage.find('.party').each(function (partyIndex, partyElm) {
      _this.partyArr[partyIndex] = [];

      $(partyElm).find('.player').each(function (playerIndex, playerElm) {
        var $playerElm = $(playerElm);
        var job = $playerElm.attr('data-job');
        var hp = $playerElm.attr('data-hp');
        var operation = $playerElm.attr('data-operation');
        var power = $playerElm.attr('data-power');

        var player = new _Player2.default({
          playerId: playerId,
          partyIndex: partyIndex,
          $party: $(partyElm),
          playerIndex: playerIndex,
          $elm: $playerElm,
          job: job,
          hp: hp,
          operation: operation,
          power: power
        });

        _this.playerArr.push(player);
        _this.partyArr[partyIndex][playerIndex] = player;

        playerId++;
      });
    });

    this.start();
  }

  _createClass(MainController, [{
    key: 'reset',
    value: function reset() {
      this.playerIndex = null;
      this.currentPlayer = null;

      this.currentPlayerIndex = null;

      this.playerArr.forEach(function (player) {
        player.disactivate();
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.nextParty();
    }
  }, {
    key: 'nextParty',
    value: function nextParty() {
      this.phase = phaseLi.SELECT;
      this.$stage.attr('data-phase', this.phase);

      if (this.currentPartyIndex == null) {
        this.currentPartyIndex = 0;
      } else if (this.currentPartyIndex < this.partyArr.length - 1) {
        this.currentPartyIndex++;
      } else {
        this.currentPartyIndex = 0;
      }

      this.attackArr = [];

      this.nextPlayer();
    }
  }, {
    key: 'nextPlayer',
    value: function nextPlayer() {
      var _this2 = this;

      if (!this.phase) {} else if (this.phase === phaseLi.SELECT) {
        if (this.currentPlayerIndex == null) {
          this.currentPlayerIndex = 0;
        } else if (this.currentPlayerIndex < this.partyArr[this.currentPartyIndex].length - 1) {
          this.currentPlayerIndex++;
        } else {
          $('.stage').off();
          this.phase = phaseLi.ATTACK;
          this.$stage.attr('data-phase', this.phase);

          this.attack();

          return;
        }

        this.prevPlayer = this.currentPlayer;
        this.currentPlayer = this.partyArr[this.currentPartyIndex][this.currentPlayerIndex];

        this.prevPlayer && this.prevPlayer.disactivate();
        this.currentPlayer.activate();

        if (!this.currentPlayer.isAlive) {
          this.nextPlayer();
          return;
        }

        $('.stage').one('click', '.player[data-alive="1"]', function (evt) {
          var playerId = $(evt.currentTarget).attr('data-player-id');
          var selectedPlayer = _this2.playerArr[playerId];

          var attack = {
            attacker: _this2.currentPlayer,
            target: selectedPlayer,
            operation: _this2.currentPlayer.operation,
            operand: _this2.currentPlayer.power
          };

          _this2.attackArr.push(attack);

          _this2.nextPlayer();
        });
      }
    }
  }, {
    key: 'attack',
    value: function attack() {
      var _this3 = this;

      this.reset();

      var finalAttack = _.last(this.attackArr);

      // promise notation from [JavaScriptのPromiseとarray.reduceを合わせて使う - yuw27b’s blog](http://yuw27b.hatenablog.com/entry/2015/09/30/235835)
      var attackPromise = function attackPromise(attack) {
        return new Promise(function (resolve) {
          var attacker = attack.attacker;
          var target = attack.target;
          var operation = attack.operation;
          var operand = attack.operand;

          var func;

          if (!operation) {} else if (operation === '+') {
            func = _CMath.CMath.sum;
          } else if (operation === '-') {
            func = _CMath.CMath.sub;
          } else if (operation === '*') {
            func = _CMath.CMath.mult;
          }

          if (target.isAlive) {
            target.hp = func(target.hp, operand);
          }

          if (target.hp === (0, _Complex2.default)(0, 0)) {
            target.isAlive = false;
          }

          attacker.$elm.addClass('attacking');
          attacker.$elm.on('transitionend', function (evt) {
            setTimeout(function () {
              attacker.$elm.removeClass('attacking');
            }, 1000);
          });

          target.$elm.addClass('attacked');
          target.$elm.on('transitionend', function (evt) {
            target.update();

            setTimeout(function () {
              target.$elm.removeClass('attacked');

              setTimeout(function () {
                resolve();
              }, 600);
            }, 1000);
          });

          if (attack === finalAttack) {
            _this3.nextParty();
          }
        });
      };

      this.attackArr.reduce(function (prevValue, currentValue) {
        return prevValue.then(function () {
          return attackPromise(currentValue);
        });
      }, Promise.resolve());
    }
  }]);

  return MainController;
}();

window.licker = window.licker || {};
(function (ns) {
  ns.mainController = new MainController();
})(window.licker);

},{"./module/CMath":2,"./module/Complex":3,"./module/Player":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CMath = undefined;

var _Complex = require('./Complex');

var _Complex2 = _interopRequireDefault(_Complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CMath = exports.CMath = {
  clamp: function clamp(x, max, min) {
    return Math.max(Math.min(x, max), min);
  },

  sum: function sum(c1, c2) {
    var re = CMath.clamp(c1.re + c2.re, 4, -4);
    var im = CMath.clamp(c1.im + c2.im, 4, -4);

    return (0, _Complex2.default)(re, im);
  },

  sub: function sub(c1, c2) {
    var re = CMath.clamp(c1.re - c2.re, 4, -4);
    var im = CMath.clamp(c1.im - c2.im, 4, -4);

    return (0, _Complex2.default)(re, im);
  },

  mult: function mult(c1, c2) {
    var re = CMath.clamp(c1.re * c2.re - c1.im * c2.im, 4, -4);
    var im = CMath.clamp(c1.re * c2.im + c2.re * c1.im, 4, -4);

    return (0, _Complex2.default)(re, im);
  }
};

},{"./Complex":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Complex;
var complexTable = [];

for (var re = -4; re <= 4; re++) {
  complexTable[re] = [];
  for (var im = -4; im <= 4; im++) {
    complexTable[re][im] = {
      re: re,
      im: im
    };
  }
}

// newするより1つの数に1オブジェクト割り当てるようにすれば等号比較が楽？
function Complex(re, im) {
  return complexTable[re][im];
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Complex = require('./Complex');

var _Complex2 = _interopRequireDefault(_Complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parseComplex(str) {
  var tmp = str.split(',');
  var re = parseInt(tmp[0]);
  var im = parseInt(tmp[1]);

  return (0, _Complex2.default)(re, im);
}

var Player = function () {
  function Player(opt) {
    _classCallCheck(this, Player);

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

    this.$elm.append('<h2>' + this.job + '</h2>');
    this.$elm.append('<div class="hp"></div>');
    this.$elm.append('<div class="power"></div>');

    this.$mapHp = $('<table class="map-hp"></table>');
    this.$elm.append(this.$mapHp);

    for (var y = 4; y >= -4; y--) {
      var $row = $('<tr></tr>');
      this.$mapHp.append($row);
      for (var x = -4; x <= 4; x++) {
        var $cell = $('<td class="cell" data-x="' + x + '" data-y="' + y + '"></td>');
        $row.append($cell);
      }
    }

    this.update();
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      if (this.isAlive) {
        this.$elm.attr('data-alive', 1);
      } else {
        this.$elm.attr('data-alive', 0);
      }

      this.$elm.find('.hp').text('HP: (' + this.hp.re + ', ' + this.hp.im + ')');
      this.$elm.find('.power').text('POW: ' + this.operation + '(' + this.power.re + ', ' + this.power.im + ')');

      this.$elm.find('.map-hp .cell').removeClass('cur').filter('[data-x="' + this.hp.re + '"][data-y="' + this.hp.im + '"]').addClass('cur');
    }
  }, {
    key: 'activate',
    value: function activate() {
      this.$elm.addClass('active');
      this.isActive = true;
    }
  }, {
    key: 'disactivate',
    value: function disactivate() {
      this.$elm.removeClass('active');
      this.isActive = false;
    }
  }]);

  return Player;
}();

exports.default = Player;

},{"./Complex":3}]},{},[1]);
