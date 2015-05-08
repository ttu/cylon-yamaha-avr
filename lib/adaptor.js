"use strict";

var Cylon = require('cylon');
var Yamaha = require('node-yamaha-avr');

var Adaptor = module.exports = function Adaptor(opts) {

  Cylon.Logger.info('Adaptor#construct');

  Adaptor.__super__.constructor.apply(this, arguments);

  this.opts = opts || {};

  this.ip = opts.host || opts.port || "192.168.2.127";

  this.connector = this.yamaha = null;
  
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function (callback) {

  Cylon.Logger.info('Adaptor#connect');
  Cylon.Logger.info('Connecting to Yamaha AVR (IP: ' + this.ip + ')');

  this.connector = this.yamaha = new Yamaha(this.ip);

  this.proxyMethods(['isOn', 'setPower', 'setMute'], this.yamaha, this);
  
  this.yamaha.isOnline()
  .then(function(isOnline) {
    Cylon.Logger.info('Connected to Yamaha AVR');
    callback();
  }, function(error){
    Cylon.Logger.info('Yamaha AVR not found');
    callback();
  });
};

Adaptor.prototype.disconnect = function (callback) {

  Cylon.Logger.info('Adaptor#disconnect');
  Cylon.Logger.info('Disconnected from Yamaha AVR');

  // Don't need to do anything

  callback();
};
