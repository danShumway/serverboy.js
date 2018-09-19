//In your program, this line will be - var gameboy = require('serverboy');
var gameboy = require('../../../src/interface.js');

var fs = require('fs');

var currentScreen;
function loadROM(file_path) {

	  var rom = fs.readFileSync(file_path);

	  //start the rom.
	  var gameboy_instance = new gameboy();
	  gameboy_instance.loadRom(rom);

	  var io; //Handle streaming.
	  var keysToPress = []; //What keys we want pressed.
	  var start_io = function() {
		    //io = socket(process.env.PORT || process.env.NODE_PORT || 3333);
        io = socket(http);

		    io.on('connection', function(socket){
            console.log('connection happened');
			      //Logic for handeling a new connection here.
			      //ie. registering a user or something similar.

			      //The new connection can send commands.
			      socket.on('keydown', function(data) {
				        var index = keysToPress.indexOf(data.key);
				        if(index === -1) {
					          keysToPress.push(data.key);
				        }
			      });

			      socket.on('keyup', function(data) {
				        var index = keysToPress.indexOf(data.key);
				        if(index !== -1) {
					          keysToPress.splice(index, 1);
				        }
			      });

			      socket.on('restart', function(data) {
				        gameboy_instance.loadROM(rom);
			      });

		    });
	  };

	  //Handle doing a single frame.
    //You want to basically time this at about 60fps.
	  var frames = 0; var lastFrame = undefined; var currentFrame = undefined;
	  var emulatorLoop = function() {
        var start = process.hrtime();

		    gameboy_instance.pressKeys(keysToPress);
		    currentScreen = gameboy_instance.doFrame();
		    frames++;
		    if(frames%5 === 0) { //Output every 10th frame.
			      if(io) {
				        io.emit('frame', currentScreen);
                io.emit('memory', gameboy_instance.getMemory());
			      }
		    }

        var elapsed = process.hrtime(start)[1] / 1000000;
        setTimeout(emulatorLoop, 5); //Try and run at about 60fps.
		    //setImmediate(emulatorLoop); //Better asynchronous loops.
	  };


	  start_io();
	  emulatorLoop();
}


console.log('starting to load rom');
loadROM("/home/danshumway/Code/piglet/streaming/roms/pokemon-yellow.gbc");

http.listen(3002, function () {
    console.log('listening on *:3002');
});
