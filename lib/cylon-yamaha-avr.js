'use strict';

var Adaptor = require('./adaptor');
var Driver = require('./driver');

module.exports = {
  // Adaptors your module provides, e.g. ['spark']
  adaptors: ['yamaha-avr'],

  // Drivers your module provides, e.g. ['led', 'button']
  drivers: ['yamaha-avr'],

  // Modules intended to be used with yours, e.g. ['cylon-gpio']
  dependencies: [],

  adaptor: function (opts) {
    return new Adaptor(opts);
  },

  driver: function (opts) {
    return new Driver(opts);
  }
};
