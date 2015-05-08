"use strict";

var Cylon = require('cylon');

var Driver = module.exports = function Driver(opts) {

  Cylon.Logger.info('Driver#construct');

  Driver.__super__.constructor.apply(this, arguments);

  this.opts = opts || {};

  // Include a list of commands that will be made available to the API.
  this.commands = {
    // This is how you register a command function for the API;
    // the command should be added to the prototype, see below.
    hello: this.hello,
    powerOn: this.powerOn,
    powerOff: this.powerOff
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function (callback) {

  Cylon.Logger.info('Driver#start');
  callback();
};

Driver.prototype.halt = function (callback) {

  Cylon.Logger.info('Driver#halt');
  callback();
};

Driver.prototype.powerOn = function (callback) {

  Cylon.Logger.info('Driver#powerOn');

  this.connection.isOn()
    .then(function (isOn) {
    if (!isOn) {
      Cylon.Logger.info('Driver# set power on');
      this.connection.setPower("on")
      .then(function(){
        Cylon.Logger.info('Driver# power is on');      
        callback();
      }, function(error) {
        Cylon.Logger.info('Driver# error on power on');      
        callback();
      });
    }
    else {
      Cylon.Logger.info('Driver# nothing to do');
      callback();
    }

  }, function (error) {
      Cylon.Logger.info('Driver# no reply');
      callback();
    });
};

Driver.prototype.powerOff = function (callback) {

  Cylon.Logger.info('Driver#powerOff');

  this.connection.isOn()
    .then(function (isOn) {
    if (isOn) {
      Cylon.Logger.info('Driver# set power off');
      this.connection.setPower("off")
      .then(function(){
        Cylon.Logger.info('Driver# power is off');
        callback();
      }, function(error){
         Cylon.Logger.info('Driver# error on power off');      
         callback();
      });
    }
    else {
      Cylon.Logger.info('Driver# nothing to do');
      callback();      
    }

  }, function (error) {
      Cylon.Logger.info('Driver# no reply');
      callback();
    });
};

Driver.prototype.hello = function (callback) {
  Cylon.Logger.info('Hello World!');

  callback();
};
