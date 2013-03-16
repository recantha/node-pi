var gpio = require('rpi-gpio');

gpio.on('export', function(channel) {
    console.log('Channel set: ' + channel);
});

gpio.setup(1, gpio.DIR_OUT, write);

function write() {
    gpio.write(1, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}

function closePins() {
    gpio.destroy(function() {
        console.log('All pins unexported');
        return process.exit(0);
    });
}

function pause() {
    setTimeout(closePins, 2000);
}
