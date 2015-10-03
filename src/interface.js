'use-strict'

var GameBoyCore = require("./gameboy_core/gameboy.js");

function Interface() {

	//----------PRIVATE VARIABLES-----------------------------

	var gameboy; //The core emulator.

	//Used internally to keep track of what keys are pressed on this frame.
	var keymap = {
		right : 0,
		left : 1,
		up : 2,
		down : 3,
		a : 4,
		b : 5,
		select : 6,
		start : 7
	};

	var down = [];
	Object.keys(keymap).forEach(function(key) {
		down[key] = false;
	});

	var frames = 0; //How many frames have run?

	//---------------------------------------------------------
	//----------INTERNAL METHODS-------------------------------


	//Checks to see if the gameboy object has been created.
	var initialized = function() {
		return (typeof gameboy == "object" && gameboy != null);
	};

	//Checks to see if the emulator is "running", not whether or not it's playing/paused.
	//Think of it like priming a gas tank before you start moving your car.  I guess.  Maybe.
	//I honestly don't know if true means it's running or stopped.
	var running = function() {
		return ((gameboy.stopEmulator & 2) == 0);
	};

	//presses or releases a key
	//takes a value from 1-8 and a boolean for pressed (true) or released (false)
	var sendKey = function(keycode, down) {
		if(initialized() && running()) {
			if (keycode >= 0 && keycode < 8) {
				gameboy.JoyPadEvent(keycode, down);
			}
		}
	};

	//stops whatever was going on.
	var clearLastEmulation = function() {
		if(initialized() && running()){
			gameboy.stopEmulator |= 2;

			//Reset some internal variables.
			frames = 0;

		} else {
			//Nothing existed to be cleared.
		}

	};

	//---------------------------------------------------------
	//------------PUBLIC METHODS-------------------------------

	this.loadROM = function(ROM) {

		clearLastEmulation();
		//autoSave(); //If we are about to load a new game, then save the last one.

		//You can load stuff here too.
		gameboy = new GameBoyCore(ROM);
		gameboy.start();

		//Reset some other variables and stuff.
		if(initialized()) {
			if (!running()) {
				gameboy.stopEmulator &= 1;
				//var dateObj = new Date();
				//gameboy.firstIteration = dateObj.getTime(); Hopefully will remove these very soon, or replace them with something else.
				gameboy.iterations = 0;
			}
			else {
				console.log("The GameBoy core is already running.");
			}
		}
	};

	//Emulates 1 frame.
	//Returns an array with the imageData from that frame, which can be later converted into a canvas writeable format (see documentation).
	this.doFrame = function(partial) {

		//Press the required keys.
		for (var i = 0; i < down.length; i++) {
			if (down[i]) {
				sendKey(i, true);
			}
		}

		gameboy.frameDone = false;
		while(!gameboy.frameDone) {
			gameboy.run(); //Go until you've finished with the frame.
		}

		//Release all the keys.
		for (var i = 0; i < down.length; i++) {
			down[i] = false;
			sendKey(i, false);
		}

		frames++;

		if(partial) {
			return gameboy.partialScreen;
		} else {
			return gameboy.currentScreen;
		}
	};

	//send an array with each key you want pressed.
	//This array should be filled with strings.
	//You can't undo a press.  Once you press a key it stays pressed until the end of the frame.
	this.pressKeys = function(_keys){
        var key;
		for (key in _keys) {
            if(_keys.hasOwnProperty(key)) {
                this.pressKey(_keys[key]);
            }
		}
	};

	//Same as above, but with just one key.
	this.pressKey = function(_key){
		var num = keymap[_key];
		if (num != null) {
			down[num] = true;
		}
	};

	//Returns an array with  all the keys.
	//TODO: this can just return the object, frozen.
	this.getKeys = function() {
		toReturn = [];
		for (var i = 0; i < keymap.length; i++) {
			toReturn.push()
		}
	};

	//Gets a block of memory.  You can specify a start and a stop number if you wish.
	this.getMemory = function(start, end) {
		var currentFrame = [];
		start = Math.max(start || 0, 0);
		end = Math.min(end || gameboy.memory.length, gameboy.memory.length);
		for(var i = start; i < end; i++) {
			currentFrame.push(gameboy.memory[i]);
		}

		return currentFrame;
	};


    /**
     * ToDo: Fill out this method and figure out proper encapsulation.  What can you modify and what can't you?
     * @returns the gameboy's current screen.
     */
    this.getScreen = function() {
        return gameboy.frameBuffer;
    };

	//----------TODO:----------------------------------------------
	//- Migrate over saving and loading in a more node-friendly format, possibly using fileIO
	//- Add sound streaming support.

}

module.exports = Interface;
