var Cylon = require('cylon');

Cylon.robot({
  connections: {
          yamaha_adap: { adaptor: 'yamaha-avr' }
        },

        devices: {
          yamaha: { driver: 'yamaha-avr' }
        },

  work: function(my) {

    console.log("Starting");
    
    my.yamaha.powerOn(function(){ 
        after(2000, function () {
          my.yamaha.powerOff(function(){
            after(2500, function () {
              my.yamaha.powerOn(function(){    
                after(1500, function () {
                  my.yamaha.powerOff(function(){
                    Cylon.halt();
                  });
                });
              });
            });
          });
        });
    });
    
  }
}).start();
