function Instance(ROMImage) {

	//My added variables--------------
	this.frameDone = false;
	this.currentScreen = []; //this.currentScreenContents;
	this.lastScreen = []; //A copy of the last frame's screen.
	this.partialScreen = {}; //An object with the differences from the last screen.


	//Params, etc...
	this.currentFrame = [];						//Array of the most recent frame.
	this.drawContext = null;					// LCD Context
	this.ROMImage = ROMImage;					//The game's ROM. 
	//CPU Registers and Flags:
	this.registerA = 0x01; 						//Register A (Accumulator)
	this.FZero = true; 							//Register F  - Result was zero
	this.FSubtract = false;						//Register F  - Subtraction was executed
	this.FHalfCarry = true;						//Register F  - Half carry or half borrow
	this.FCarry = true;							//Register F  - Carry or borrow
	this.registerB = 0x00;						//Register B
	this.registerC = 0x13;						//Register C
	this.registerD = 0x00;						//Register D
	this.registerE = 0xD8;						//Register E
	this.registersHL = 0x014D;					//Registers H and L combined
	this.stackPointer = 0xFFFE;					//Stack Pointer
	this.programCounter = 0x0100;				//Program Counter
	//Some CPU Emulation State Variables:
	this.CPUCyclesTotal = 0;					//Relative CPU clocking to speed set, rounded appropriately.
	this.CPUCyclesTotalBase = 0;				//Relative CPU clocking to speed set base.
	this.CPUCyclesTotalCurrent = 0;				//Relative CPU clocking to speed set, the directly used value.
	this.CPUCyclesTotalRoundoff = 0;			//Clocking per iteration rounding catch.
	this.baseCPUCyclesPerIteration	= 0;		//CPU clocks per iteration at 1x speed.
	this.remainingClocks = 0;					//HALT clocking overrun carry over.
	this.inBootstrap = true;					//Whether we're in the GBC boot ROM.
	this.usedBootROM = false;					//Updated upon ROM loading...
	this.usedGBCBootROM = false;				//Did we boot to the GBC boot ROM?
	this.halt = false;							//Has the CPU been suspended until the next interrupt?
	this.skipPCIncrement = false;				//Did we trip the DMG Halt bug?
	this.stopEmulator = 3;						//Has the emulation been paused or a frame has ended?
	this.IME = true;							//Are interrupts enabled?
	this.IRQLineMatched = 0;					//CPU IRQ assertion.
	this.interruptsRequested = 0;				//IF Register
	this.interruptsEnabled = 0;					//IE Register
	this.hdmaRunning = false;					//HDMA Transfer Flag - GBC only
	this.CPUTicks = 0;							//The number of clock cycles emulated.
	this.doubleSpeedShifter = 0;				//GBC double speed clocking shifter.
	this.JoyPad = 0xFF;							//Joypad State (two four-bit states actually)
	this.CPUStopped = false;					//CPU STOP status.
	//Main RAM, MBC RAM, GBC Main RAM, VRAM, etc.
	this.memoryReader = [];						//Array of functions mapped to read back memory
	this.memoryWriter = [];						//Array of functions mapped to write to memory
	this.memoryHighReader = [];					//Array of functions mapped to read back 0xFFXX memory
	this.memoryHighWriter = [];					//Array of functions mapped to write to 0xFFXX memory
	this.ROM = [];								//The full ROM file dumped to an array.
	this.memory = [];							//Main Core Memory
	this.MBCRam = [];							//Switchable RAM (Used by games for more RAM) for the main memory range 0xA000 - 0xC000.
	this.VRAM = [];								//Extra VRAM bank for GBC.
	this.GBCMemory = [];						//GBC main RAM Banks
	this.MBC1Mode = false;						//MBC1 Type (4/32, 16/8)
	this.MBCRAMBanksEnabled = false;			//MBC RAM Access Control.
	this.currMBCRAMBank = 0;					//MBC Currently Indexed RAM Bank
	this.currMBCRAMBankPosition = -0xA000;		//MBC Position Adder;
	this.cGBC = false;							//GameBoy Color detection.
	this.gbcRamBank = 1;						//Currently Switched GameBoy Color ram bank
	this.gbcRamBankPosition = -0xD000;			//GBC RAM offset from address start.
	this.gbcRamBankPositionECHO = -0xF000;		//GBC RAM (ECHO mirroring) offset from address start.
	this.RAMBanks = [0, 1, 2, 4, 16];			//Used to map the RAM banks to maximum size the MBC used can do.
	this.ROMBank1offs = 0;						//Offset of the ROM bank switching.
	this.currentROMBank = 0;					//The parsed current ROM bank selection.
	this.cartridgeType = 0;						//Cartridge Type
	this.name = "";								//Name of the game
	this.gameCode = "";							//Game code (Suffix for older games)
	this.fromSaveState = false;					//A boolean to see if this was loaded in as a save state.
	this.savedStateFileName = "";				//When loaded in as a save state, this will not be empty.
	this.STATTracker = 0;						//Tracker for STAT triggering.
	this.modeSTAT = 0;							//The scan line mode (for lines 1-144 it's 2-3-0, for 145-154 it's 1)
	this.spriteCount = 252;						//Mode 3 extra clocking counter (Depends on how many sprites are on the current line.).
	this.LYCMatchTriggerSTAT = false;			//Should we trigger an interrupt if LY==LYC?
	this.mode2TriggerSTAT = false;				//Should we trigger an interrupt if in mode 2?
	this.mode1TriggerSTAT = false;				//Should we trigger an interrupt if in mode 1?
	this.mode0TriggerSTAT = false;				//Should we trigger an interrupt if in mode 0?
	this.LCDisOn = false;						//Is the emulated LCD controller on?
	this.LINECONTROL = [];						//Array of functions to handle each scan line we do (onscreen + offscreen)
	this.DISPLAYOFFCONTROL = [function (parentObj) {
		//Array of line 0 function to handle the LCD controller when it's off (Do nothing!).
	}];
	this.LCDCONTROL = null;						//Pointer to either LINECONTROL or DISPLAYOFFCONTROL.
	this.initializeLCDController();				//Compile the LCD controller functions.
	//RTC (Real Time Clock for MBC3):
	this.RTCisLatched = false;
	this.latchedSeconds = 0;					//RTC latched seconds.
	this.latchedMinutes = 0;					//RTC latched minutes.
	this.latchedHours = 0;						//RTC latched hours.
	this.latchedLDays = 0;						//RTC latched lower 8-bits of the day counter.
	this.latchedHDays = 0;						//RTC latched high-bit of the day counter.
	this.RTCSeconds = 0;						//RTC seconds counter.
	this.RTCMinutes = 0;						//RTC minutes counter.
	this.RTCHours = 0;							//RTC hours counter.
	this.RTCDays = 0;							//RTC days counter.
	this.RTCDayOverFlow = false;				//Did the RTC overflow and wrap the day counter?
	this.RTCHALT = false;						//Is the RTC allowed to clock up?
	//Gyro:
	this.highX = 127;
	this.lowX = 127;
	this.highY = 127;
	this.lowY = 127;
	//Sound variables:
	this.audioHandle = null;						//XAudioJS handle
	this.numSamplesTotal = 0;						//Length of the sound buffers.
	this.dutyLookup = [								//Map the duty values given to ones we can work with.
		[false, false, false, false, false, false, false, true],
		[true, false, false, false, false, false, false, true],
		[true, false, false, false, false, true, true, true],
		[false, true, true, true, true, true, true, false]
	];
	this.bufferContainAmount = 0;					//Buffer maintenance metric.
	this.LSFR15Table = null;
	this.LSFR7Table = null;
	this.noiseSampleTable = null;
	this.initializeAudioStartState();
	this.soundMasterEnabled = false;			//As its name implies
	this.channel3PCM = null;					//Channel 3 adjusted sample buffer.
	//Vin Shit:
	this.VinLeftChannelMasterVolume = 8;		//Computed post-mixing volume.
	this.VinRightChannelMasterVolume = 8;		//Computed post-mixing volume.
	//Channel paths enabled:
	this.leftChannel1 = false;
	this.leftChannel2 = false;
	this.leftChannel3 = false;
	this.leftChannel4 = false;
	this.rightChannel1 = false;
	this.rightChannel2 = false;
	this.rightChannel3 = false;
	this.rightChannel4 = false;
	this.audioClocksUntilNextEvent = 1;
	this.audioClocksUntilNextEventCounter = 1;
	//Channel output level caches:
	this.channel1currentSampleLeft = 0;
	this.channel1currentSampleRight = 0;
	this.channel2currentSampleLeft = 0;
	this.channel2currentSampleRight = 0;
	this.channel3currentSampleLeft = 0;
	this.channel3currentSampleRight = 0;
	this.channel4currentSampleLeft = 0;
	this.channel4currentSampleRight = 0;
	this.channel1currentSampleLeftSecondary = 0;
	this.channel1currentSampleRightSecondary = 0;
	this.channel2currentSampleLeftSecondary = 0;
	this.channel2currentSampleRightSecondary = 0;
	this.channel3currentSampleLeftSecondary = 0;
	this.channel3currentSampleRightSecondary = 0;
	this.channel4currentSampleLeftSecondary = 0;
	this.channel4currentSampleRightSecondary = 0;
	this.channel1currentSampleLeftTrimary = 0;
	this.channel1currentSampleRightTrimary = 0;
	this.channel2currentSampleLeftTrimary = 0;
	this.channel2currentSampleRightTrimary = 0;
	this.mixerOutputCache = 0;
	//Pre-multipliers to cache some calculations:
	this.emulatorSpeed = 1;
	this.initializeTiming();
	//Audio generation counters:
	this.audioTicks = 0;				//Used to sample the audio system every x CPU instructions.
	this.audioIndex = 0;				//Used to keep alignment on audio generation.
	this.downsampleInput = 0;
	this.audioDestinationPosition = 0;	//Used to keep alignment on audio generation.
	this.rollover = 0;					//Used to keep alignment on the number of samples to output (Realign from counter alias).
	//Timing Variables
	this.emulatorTicks = 0;				//Times for how many instructions to execute before ending the loop.
	this.DIVTicks = 56;					//DIV Ticks Counter (Invisible lower 8-bit)
	this.LCDTicks = 60;					//Counter for how many instructions have been executed on a scanline so far.
	this.timerTicks = 0;				//Counter for the TIMA timer.
	this.TIMAEnabled = false;			//Is TIMA enabled?
	this.TACClocker = 1024;				//Timer Max Ticks
	this.serialTimer = 0;				//Serial IRQ Timer
	this.serialShiftTimer = 0;			//Serial Transfer Shift Timer
	this.serialShiftTimerAllocated = 0;	//Serial Transfer Shift Timer Refill
	this.IRQEnableDelay = 0;			//Are the interrupts on queue to be enabled?
	var dateVar = new Date();
	this.lastIteration = dateVar.getTime();//The last time we iterated the main loop.
	dateVar = new Date();
	this.firstIteration = dateVar.getTime();
	this.iterations = 0;
	this.actualScanLine = 0;			//Actual scan line...
	this.lastUnrenderedLine = 0;		//Last rendered scan line...
	this.queuedScanLines = 0;
	this.totalLinesPassed = 0;
	this.haltPostClocks = 0;			//Post-Halt clocking.
	//ROM Cartridge Components:
	this.cMBC1 = false;					//Does the cartridge use MBC1?
	this.cMBC2 = false;					//Does the cartridge use MBC2?
	this.cMBC3 = false;					//Does the cartridge use MBC3?
	this.cMBC5 = false;					//Does the cartridge use MBC5?
	this.cMBC7 = false;					//Does the cartridge use MBC7?
	this.cSRAM = false;					//Does the cartridge use save RAM?
	this.cMMMO1 = false;				//...
	this.cRUMBLE = false;				//Does the cartridge use the RUMBLE addressing (modified MBC5)?
	this.cCamera = false;				//Is the cartridge actually a GameBoy Camera?
	this.cTAMA5 = false;				//Does the cartridge use TAMA5? (Tamagotchi Cartridge)
	this.cHuC3 = false;					//Does the cartridge use HuC3 (Hudson Soft / modified MBC3)?
	this.cHuC1 = false;					//Does the cartridge use HuC1 (Hudson Soft / modified MBC1)?
	this.cTIMER = false;				//Does the cartridge have an RTC?
	this.ROMBanks = [					// 1 Bank = 16 KBytes = 256 Kbits
		2, 4, 8, 16, 32, 64, 128, 256, 512
	];
	this.ROMBanks[0x52] = 72;
	this.ROMBanks[0x53] = 80;
	this.ROMBanks[0x54] = 96;
	this.numRAMBanks = 0;					//How many RAM banks were actually allocated?
	////Graphics Variables
	this.currVRAMBank = 0;					//Current VRAM bank for GBC.
	this.backgroundX = 0;					//Register SCX (X-Scroll)
	this.backgroundY = 0;					//Register SCY (Y-Scroll)
	this.gfxWindowDisplay = false;			//Is the windows enabled?
	this.gfxSpriteShow = false;				//Are sprites enabled?
	this.gfxSpriteNormalHeight = true;		//Are we doing 8x8 or 8x16 sprites?
	this.bgEnabled = true;					//Is the BG enabled?
	this.BGPriorityEnabled = true;			//Can we flag the BG for priority over sprites?
	this.gfxWindowCHRBankPosition = 0;		//The current bank of the character map the window uses.
	this.gfxBackgroundCHRBankPosition = 0;	//The current bank of the character map the BG uses.
	this.gfxBackgroundBankOffset = 0x80;	//Fast mapping of the tile numbering/
	this.windowY = 0;						//Current Y offset of the window.
	this.windowX = 0;						//Current X offset of the window.
	this.drewBlank = 0;						//To prevent the repeating of drawing a blank screen.
	this.drewFrame = false;					//Throttle how many draws we can do to once per iteration.
	this.midScanlineOffset = -1;			//mid-scanline rendering offset.
	this.pixelEnd = 0;						//track the x-coord limit for line rendering (mid-scanline usage).
	this.currentX = 0;						//The x-coord we left off at for mid-scanline rendering.
	//BG Tile Pointer Caches:
	this.BGCHRBank1 = null;
	this.BGCHRBank2 = null;
	this.BGCHRCurrentBank = null;
	//Tile Data Cache:
	this.tileCache = null;
	//Palettes:
	this.colors = [0xEFFFDE, 0xADD794, 0x529273, 0x183442];			//"Classic" GameBoy palette colors.
	this.OBJPalette = null;
	this.BGPalette = null;
	this.gbcOBJRawPalette = null;
	this.gbcBGRawPalette = null;
	this.gbOBJPalette = null;
	this.gbBGPalette = null;
	this.gbcOBJPalette = null;
	this.gbcBGPalette = null;
	this.gbBGColorizedPalette = null;
	this.gbOBJColorizedPalette = null;
	this.cachedBGPaletteConversion = null;
	this.cachedOBJPaletteConversion = null;
	this.updateGBBGPalette = this.updateGBRegularBGPalette;
	this.updateGBOBJPalette = this.updateGBRegularOBJPalette;
	this.colorizedGBPalettes = false;
	this.BGLayerRender = null;			//Reference to the BG rendering function.
	this.WindowLayerRender = null;		//Reference to the window rendering function.
	this.SpriteLayerRender = null;		//Reference to the OAM rendering function.
	this.frameBuffer = [];				//The internal frame-buffer.
	this.swizzledFrame = null;			//The secondary gfx buffer that holds the converted RGBA values.
	this.canvasBuffer = null;			//imageData handle
	this.pixelStart = 0;				//Temp variable for holding the current working framebuffer offset.
	//Variables used for scaling in JS:
	this.onscreenWidth = this.offscreenWidth = 160;
	this.onscreenHeight = this.offScreenheight = 144;
	this.offscreenRGBCount = this.onscreenWidth * this.onscreenHeight * 4;
	this.resizePathClear = true;
	//Initialize the white noise cache tables ahead of time:
	this.intializeWhiteNoise();

}

module.exports = Instance;