// Based on example from https://github.com/EnotionZ/GpiO
// by Dominick Pham
// This script written by Michael Horne (www.recantha.co.uk)
var gpio = require("gpio");
var led1, led2, intervalTimer;

var led1_pin = 17;
var led2_pin = 4;

// Flashing lights if LED connected to led1
led1 = gpio.export(led1_pin, {
   ready: function() {
      inervalTimer = setInterval(function() {
         led1.set();
         setTimeout(function() { led1.reset(); }, 500);
      }, 1000);
   }
});

// Lets assume a different LED is hooked up to pin 4, the following code 
// will make that LED blink inversely with LED from pin 22 
led2 = gpio.export(led2_pin, {
   ready: function() {
      // bind to led1's change event
      led1.on("change", function(val) {
         led2.set(1 - val); // set led2 to the opposite value
      });
   }
});

// After 10 seconds have elapsed, clear all the timers, remove all the event handlers and unexport the pins.
// Then exit nicely
setTimeout(function() {
   clearInterval(intervalTimer);          // stops the voltage cycling
   led1.removeAllListeners('change');   // unbinds change event
   led1.reset();                        // sets header to low
   led1.unexport();                     // unexport the header

   led2.reset();
   led2.unexport(function() {
      // unexport takes a callback which gets fired as soon as unexporting is done
      process.exit(); // exits your node program
   });
}, 10000)