var Distilled = require('@latinfor/distilled');

var tests = {
    cpu: {
        file: './roms/blargg_tests/cpu_instrs.gb',
        duration: 4200
    },

    //other test ROMs here
};

var regenerate = (function () {
    var args = process.argv.slice(2);
    return args.includes('generate');
}());

var results = require('')
