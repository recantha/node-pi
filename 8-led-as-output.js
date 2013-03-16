var pin_led_1 = pinSetup(4, 'out');

setTimeout(function() {
	setInterval(function() {
		pinOn(pin_led_1)
	}, 1000)
}, 500)

setTimeout(function() {
	setInterval(function() {
		pinOff(pin_led_1);
	}, 1000)
}, 1000)



/* *********************************************** */
function pinSetup(pin, mode) {
	var fs = require('fs');
	fs.writeFile('/sys/class/gpio/export', pin);
	fs.writeFile('/sys/class/gpio/gpio' + pin + '/direction', mode);

	return pin;
}

function pinOn(pin) {
	var fs = require('fs');
	fs.writeFile('/sys/class/gpio/gpio' + pin + '/value', '1');
}

function pinOff(pin) {
	var fs = require('fs');
	fs.writeFile('/sys/class/gpio/gpio' + pin + '/value', '0');
}
