var path = require('path');
var browserify = require('browserify');

var entry = './src/interface';
var output = './examples/bundle.js';

var result = new Promise(function(res, rej) {
    var bundle = browserify('interface', { standalone : 'Gameboy' });

    bundle.bundle(function (err, buffer) {
        if (err) { throw new Error(err); }

        res(buffer);
    });
});
