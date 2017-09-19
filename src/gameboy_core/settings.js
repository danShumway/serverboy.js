var settings = [						//Some settings.
0	false, //Turn on sound.
1	true,								//Boot with boot ROM first?
2	false,								//Give priority to GameBoy mode
3	1,									//Volume level set.
4	true,								//Colorize GB mode?
5	false,								//Disallow typed arrays?
6	8,									//Interval for the emulator loop.
7	10,									//Audio buffer minimum span amount over x interpreter iterations.
8	20,									//Audio buffer maximum span amount over x interpreter iterations.
9	false,								//Override to allow for MBC1 instead of ROM only (compatibility for broken 3rd-party cartridges).
10	false,								//Override MBC RAM disabling and always allow reading and writing to the banks.
11	false,								//Use the GameBoy boot ROM instead of the GameBoy Color boot ROM.
12	false,								//Scale the canvas in JS, or let the browser scale the canvas?
13	true,								//Use image smoothing based scaling?
14    [true, true, true, true]            //User controlled channel enables.
];

var settings = {
	  sound : false, //Turn on sound.
	  bootRom : true, //Boot with boot ROM first? (?)
	  prioritizeGB : false, //Give priority to GameBoy mode
	  volumeLevel : 1, //Volume level set.
	  colorize : true, //Colorize GB mode?
	  interval : 8, //Interval for the emulator loop.
	  audioBufferMin : 10, //Audio buffer minimum span amount over x interpreter iterations.
	  audioBufferMax : 20, //Audio buffer maximum span amount over x interpreter iterations.
	  allowMBC1 : false, //Override to allow for MBC1 instead of ROM only (compatibility for broken 3rd-party cartridges).
	  allowReadWrite : false, //Override MBC RAM disabling and always allow reading and writing to the banks.
	  useGBRom : false, //Use the GameBoy boot ROM instead of the GameBoy Color boot ROM.
	  xxxxx : false, //Scale the canvas in JS, or let the browser scale the canvas?
	  xxxxxxxx : true, //Use image smoothing based scaling?
    userChannels : [true, true, true, true] //User controlled channel enables.
};

module.exports = settings;
