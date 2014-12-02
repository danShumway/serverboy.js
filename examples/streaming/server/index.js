(function() { "use strict"; })();


//In your program, this line will be - var gameboy = require('serverboy');
var gameboy = require('../../../src/interface.js');

var fs = require('fs');
var socket = require('socket.io');
var currentScreen;

function loadROM(file_path) {

	var rom = fs.readFileSync(file_path);

	//start the rom.
	var gameboy_instance = new gameboy();
	gameboy_instance.loadROM(rom);



	var io; //Handle streaming.
	var keysToPress; //What keys we want pressed.
	var start_io = function() {
		io = socket(process.env.PORT || process.env.NODE_PORT || 3333);

		io.on('connection', function(socket){
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
	var frames = 0; var lastFrame = undefined; var currentFrame = undefined;
	var emulatorLoop = function() {

		gameboy_instance.pressKeys(keysToPress);
		currentScreen = gameboy_instance.doFrame();
		frames++;
		if(frames%10 === 0) { //Output every 10th frame.
			if(io) {
				io.emit('frame', currentScreen);
			}
		}

		setImmediate(emulatorLoop); //Better asynchronous loops.
		
	};

	start_io();
	emulatorLoop();
}


console.log('starting to load rom');
loadROM("../ROM/mario.gb");


