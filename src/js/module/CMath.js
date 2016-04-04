import Complex from './Complex';

export const CMath = {
  clamp: function(x, max, min) {
    return Math.max(Math.min(x, max), min);
  },

  sum: function(c1, c2) {
    var re = CMath.clamp(c1.re + c2.re, 4, -4);
    var im = CMath.clamp(c1.im + c2.im, 4, -4);

    return Complex(re, im);
  },

  sub: function(c1, c2) {
    var re = CMath.clamp(c1.re - c2.re, 4, -4);
    var im = CMath.clamp(c1.im - c2.im, 4, -4);

    return Complex(re, im);
  },

  mult: function(c1, c2) {
    var re = CMath.clamp(c1.re * c2.re - c1.im * c2.im, 4, -4);
    var im = CMath.clamp(c1.re * c2.im + c2.re * c1.im, 4, -4);

    return Complex(re, im);
  },
};