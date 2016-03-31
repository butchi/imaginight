(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(opt) {
    _classCallCheck(this, Player);

    this.playerId = opt.playerId;
    this.unitIndex = opt.unitIndex;
    this.$unit = opt.$unit;
    this.playerIndex = opt.playerIndex;
    this.$elm = opt.$elm;

    this.job = opt.job;

    this.hp = parseComplex(opt.hp);
    this.power = parseComplex(opt.power);

    this.$elm.append('<h2>' + this.job + '</h2>');
    this.$elm.append('<div class="hp">' + this.hp.re + ', ' + this.hp.im + '</div>');
    this.$elm.append('<div class="power">' + this.power.re + ', ' + this.power.im + '</div>');
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      ;
    }
  }]);

  return Player;
}();

window.Complex = function Complex(re, im) {
  _classCallCheck(this, Complex);

  this.re = re;
  this.im = im;
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
(function (ns) {
  var playerArr = [];
  var playerId = 0;
  $('.unit').each(function (unitIndex, unitElm) {
    $(unitElm).find('.player').each(function (playerIndex, playerElm) {
      var $playerElm = $(playerElm);
      var job = $playerElm.attr('data-job');
      var hp = $playerElm.attr('data-hp');
      var power = $playerElm.attr('data-power');
      var operation = $playerElm.attr('data-operation');
      playerArr.push(new Player({
        playerId: playerId,
        unitIndex: unitIndex,
        $unit: $(unitElm),
        playerIndex: playerIndex,
        $elm: $playerElm,
        job: job,
        hp: hp,
        power: power
      }));

      playerId++;
    });
  });
})(window.licker);

},{}]},{},[1]);
