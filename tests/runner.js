var Distilled = require('@latinfor/distilled');
var assert = require('assert');
var _ = require('lodash');

var PNG = require('pngjs').PNG;

var path = require('path');
var fs = require('fs');

function rel (relpath) {
    return path.resolve(process.cwd(), relpath);
}

var Gameboy = require(rel('./src/interface.js'));

var tests = {
    instr_timing: {
        file: './roms/blargg_tests/instr_timing.gb',
        duration: 260
    },
    cpu_instrs: {
        file: './roms/blargg_tests/cpu_instrs.gb',
        duration: 4200
    },
    interrupt_time: {
        file: './roms/blargg_tests/interrupt_time.gb',
        duration: 260
    },
    mem_timing: {
        file: './roms/blargg_tests/mem_timing.gb',
        duration: 625
    },
    oam_bug: {
        file: './roms/blargg_tests/oam_bug.gb',
        duration: 1875
    }

    //---------NEW TEST ROMS HERE-------------
};

// Whether we're running tests or generating them.
var regenerate = (function () {
    var args = process.argv.slice(2);
    return args.includes('generate');
}());

function run (test, name, suite) {
    var rom = fs.readFileSync(rel(test.file));

    var gameboy = new Gameboy();
    gameboy.loadRom(rom);

    for (let i=0; i<test.duration; i++) {
        gameboy.doFrame();
    }

    test.actual = gameboy.getScreen();

    var expectedpath = rel(`./tests/results/${name}.json`);
    var imagepath = rel(`./tests/results/${name}.png`);

    if (regenerate) {
        fs.writeFileSync(expectedpath, JSON.stringify(test.actual));

        //generate png equivalent and write that as well.
        var png = new PNG({ width: 160, height: 144 });
        for (let i=0; i<test.actual.length; i++) {
            png.data[i] = test.actual[i];
        }

        fs.writeFileSync(imagepath, PNG.sync.write(png));

        return;
    }

    // Load expected and compare.
    test.expected = JSON.parse(fs.readFileSync(expectedpath, 'utf8'));

    suite.test(name, function () {

        // I actually don't want the expected/actual comparison to show up
        // since it's two *massive* JSON arrays.
        try {
            assert.deepEqual(test.expected, test.actual);
        } catch (err) {
            throw new Error('Screen difference detected when running ROM');
        }
    });

}

(function entry (tests) {
    console.log(regenerate ?
                `Generating integration tests (this might take a while)` :
                `Running integration tests (this might take a while)`);

    var suite = regenerate ? null : new Distilled();
    _.each(tests, function (test, name) {
        run(test, name, suite);
    });

    if (regenerate) { console.log('Integration test results generated'); }

}(tests));
