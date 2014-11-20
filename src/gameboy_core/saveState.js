var saveState = function () {
	return [
		this.fromTypedArray(this.ROM),
		this.inBootstrap,
		this.registerA,
		this.FZero,
		this.FSubtract,
		this.FHalfCarry,
		this.FCarry,
		this.registerB,
		this.registerC,
		this.registerD,
		this.registerE,
		this.registersHL,
		this.stackPointer,
		this.programCounter,
		this.halt,
		this.IME,
		this.hdmaRunning,
		this.CPUTicks,
		this.doubleSpeedShifter,
		this.fromTypedArray(this.memory),
		this.fromTypedArray(this.MBCRam),
		this.fromTypedArray(this.VRAM),
		this.currVRAMBank,
		this.fromTypedArray(this.GBCMemory),
		this.MBC1Mode,
		this.MBCRAMBanksEnabled,
		this.currMBCRAMBank,
		this.currMBCRAMBankPosition,
		this.cGBC,
		this.gbcRamBank,
		this.gbcRamBankPosition,
		this.ROMBank1offs,
		this.currentROMBank,
		this.cartridgeType,
		this.name,
		this.gameCode,
		this.modeSTAT,
		this.LYCMatchTriggerSTAT,
		this.mode2TriggerSTAT,
		this.mode1TriggerSTAT,
		this.mode0TriggerSTAT,
		this.LCDisOn,
		this.gfxWindowCHRBankPosition,
		this.gfxWindowDisplay,
		this.gfxSpriteShow,
		this.gfxSpriteNormalHeight,
		this.gfxBackgroundCHRBankPosition,
		this.gfxBackgroundBankOffset,
		this.TIMAEnabled,
		this.DIVTicks,
		this.LCDTicks,
		this.timerTicks,
		this.TACClocker,
		this.serialTimer,
		this.serialShiftTimer,
		this.serialShiftTimerAllocated,
		this.IRQEnableDelay,
		this.lastIteration,
		this.cMBC1,
		this.cMBC2,
		this.cMBC3,
		this.cMBC5,
		this.cMBC7,
		this.cSRAM,
		this.cMMMO1,
		this.cRUMBLE,
		this.cCamera,
		this.cTAMA5,
		this.cHuC3,
		this.cHuC1,
		this.drewBlank,
		this.fromTypedArray(this.frameBuffer),
		this.bgEnabled,
		this.BGPriorityEnabled,
		this.channel1FrequencyTracker,
		this.channel1FrequencyCounter,
		this.channel1totalLength,
		this.channel1envelopeVolume,
		this.channel1envelopeType,
		this.channel1envelopeSweeps,
		this.channel1envelopeSweepsLast,
		this.channel1consecutive,
		this.channel1frequency,
		this.channel1SweepFault,
		this.channel1ShadowFrequency,
		this.channel1timeSweep,
		this.channel1lastTimeSweep,
		this.channel1Swept,
		this.channel1frequencySweepDivider,
		this.channel1decreaseSweep,
		this.channel2FrequencyTracker,
		this.channel2FrequencyCounter,
		this.channel2totalLength,
		this.channel2envelopeVolume,
		this.channel2envelopeType,
		this.channel2envelopeSweeps,
		this.channel2envelopeSweepsLast,
		this.channel2consecutive,
		this.channel2frequency,
		this.channel3canPlay,
		this.channel3totalLength,
		this.channel3patternType,
		this.channel3frequency,
		this.channel3consecutive,
		this.fromTypedArray(this.channel3PCM),
		this.channel4FrequencyPeriod,
		this.channel4lastSampleLookup,
		this.channel4totalLength,
		this.channel4envelopeVolume,
		this.channel4currentVolume,
		this.channel4envelopeType,
		this.channel4envelopeSweeps,
		this.channel4envelopeSweepsLast,
		this.channel4consecutive,
		this.channel4BitRange,
		this.soundMasterEnabled,
		this.VinLeftChannelMasterVolume,
		this.VinRightChannelMasterVolume,
		this.leftChannel1,
		this.leftChannel2,
		this.leftChannel3,
		this.leftChannel4,
		this.rightChannel1,
		this.rightChannel2,
		this.rightChannel3,
		this.rightChannel4,
		this.channel1currentSampleLeft,
		this.channel1currentSampleRight,
		this.channel2currentSampleLeft,
		this.channel2currentSampleRight,
		this.channel3currentSampleLeft,
		this.channel3currentSampleRight,
		this.channel4currentSampleLeft,
		this.channel4currentSampleRight,
		this.channel1currentSampleLeftSecondary,
		this.channel1currentSampleRightSecondary,
		this.channel2currentSampleLeftSecondary,
		this.channel2currentSampleRightSecondary,
		this.channel3currentSampleLeftSecondary,
		this.channel3currentSampleRightSecondary,
		this.channel4currentSampleLeftSecondary,
		this.channel4currentSampleRightSecondary,
		this.channel1currentSampleLeftTrimary,
		this.channel1currentSampleRightTrimary,
		this.channel2currentSampleLeftTrimary,
		this.channel2currentSampleRightTrimary,
		this.mixerOutputCache,
		this.channel1DutyTracker,
		this.channel1CachedDuty,
		this.channel2DutyTracker,
		this.channel2CachedDuty,
		this.channel1Enabled,
		this.channel2Enabled,
		this.channel3Enabled,
		this.channel4Enabled,
		this.sequencerClocks,
		this.sequencePosition,
		this.channel3Counter,
		this.channel4Counter,
		this.cachedChannel3Sample,
		this.cachedChannel4Sample,
		this.channel3FrequencyPeriod,
		this.channel3lastSampleLookup,
		this.actualScanLine,
		this.lastUnrenderedLine,
		this.queuedScanLines,
		this.RTCisLatched,
		this.latchedSeconds,
		this.latchedMinutes,
		this.latchedHours,
		this.latchedLDays,
		this.latchedHDays,
		this.RTCSeconds,
		this.RTCMinutes,
		this.RTCHours,
		this.RTCDays,
		this.RTCDayOverFlow,
		this.RTCHALT,
		this.usedBootROM,
		this.skipPCIncrement,
		this.STATTracker,
		this.gbcRamBankPositionECHO,
		this.numRAMBanks,
		this.windowY,
		this.windowX,
		this.fromTypedArray(this.gbcOBJRawPalette),
		this.fromTypedArray(this.gbcBGRawPalette),
		this.fromTypedArray(this.gbOBJPalette),
		this.fromTypedArray(this.gbBGPalette),
		this.fromTypedArray(this.gbcOBJPalette),
		this.fromTypedArray(this.gbcBGPalette),
		this.fromTypedArray(this.gbBGColorizedPalette),
		this.fromTypedArray(this.gbOBJColorizedPalette),
		this.fromTypedArray(this.cachedBGPaletteConversion),
		this.fromTypedArray(this.cachedOBJPaletteConversion),
		this.fromTypedArray(this.BGCHRBank1),
		this.fromTypedArray(this.BGCHRBank2),
		this.haltPostClocks,
		this.interruptsRequested,
		this.interruptsEnabled,
		this.remainingClocks,
		this.colorizedGBPalettes,
		this.backgroundY,
		this.backgroundX,
		this.CPUStopped,
		this.audioClocksUntilNextEvent,
		this.audioClocksUntilNextEventCounter
	];
}
var returnFromState = function (returnedFrom) {
	var index = 0;
	var state = returnedFrom.slice(0);
	this.ROM = this.toTypedArray(state[index++], "uint8");
	this.ROMBankEdge = Math.floor(this.ROM.length / 0x4000);
	this.inBootstrap = state[index++];
	this.registerA = state[index++];
	this.FZero = state[index++];
	this.FSubtract = state[index++];
	this.FHalfCarry = state[index++];
	this.FCarry = state[index++];
	this.registerB = state[index++];
	this.registerC = state[index++];
	this.registerD = state[index++];
	this.registerE = state[index++];
	this.registersHL = state[index++];
	this.stackPointer = state[index++];
	this.programCounter = state[index++];
	this.halt = state[index++];
	this.IME = state[index++];
	this.hdmaRunning = state[index++];
	this.CPUTicks = state[index++];
	this.doubleSpeedShifter = state[index++];
	this.memory = this.toTypedArray(state[index++], "uint8");
	this.MBCRam = this.toTypedArray(state[index++], "uint8");
	this.VRAM = this.toTypedArray(state[index++], "uint8");
	this.currVRAMBank = state[index++];
	this.GBCMemory = this.toTypedArray(state[index++], "uint8");
	this.MBC1Mode = state[index++];
	this.MBCRAMBanksEnabled = state[index++];
	this.currMBCRAMBank = state[index++];
	this.currMBCRAMBankPosition = state[index++];
	this.cGBC = state[index++];
	this.gbcRamBank = state[index++];
	this.gbcRamBankPosition = state[index++];
	this.ROMBank1offs = state[index++];
	this.currentROMBank = state[index++];
	this.cartridgeType = state[index++];
	this.name = state[index++];
	this.gameCode = state[index++];
	this.modeSTAT = state[index++];
	this.LYCMatchTriggerSTAT = state[index++];
	this.mode2TriggerSTAT = state[index++];
	this.mode1TriggerSTAT = state[index++];
	this.mode0TriggerSTAT = state[index++];
	this.LCDisOn = state[index++];
	this.gfxWindowCHRBankPosition = state[index++];
	this.gfxWindowDisplay = state[index++];
	this.gfxSpriteShow = state[index++];
	this.gfxSpriteNormalHeight = state[index++];
	this.gfxBackgroundCHRBankPosition = state[index++];
	this.gfxBackgroundBankOffset = state[index++];
	this.TIMAEnabled = state[index++];
	this.DIVTicks = state[index++];
	this.LCDTicks = state[index++];
	this.timerTicks = state[index++];
	this.TACClocker = state[index++];
	this.serialTimer = state[index++];
	this.serialShiftTimer = state[index++];
	this.serialShiftTimerAllocated = state[index++];
	this.IRQEnableDelay = state[index++];
	this.lastIteration = state[index++];
	this.cMBC1 = state[index++];
	this.cMBC2 = state[index++];
	this.cMBC3 = state[index++];
	this.cMBC5 = state[index++];
	this.cMBC7 = state[index++];
	this.cSRAM = state[index++];
	this.cMMMO1 = state[index++];
	this.cRUMBLE = state[index++];
	this.cCamera = state[index++];
	this.cTAMA5 = state[index++];
	this.cHuC3 = state[index++];
	this.cHuC1 = state[index++];
	this.drewBlank = state[index++];
	this.frameBuffer = this.toTypedArray(state[index++], "int32");
	this.bgEnabled = state[index++];
	this.BGPriorityEnabled = state[index++];
	this.channel1FrequencyTracker = state[index++];
	this.channel1FrequencyCounter = state[index++];
	this.channel1totalLength = state[index++];
	this.channel1envelopeVolume = state[index++];
	this.channel1envelopeType = state[index++];
	this.channel1envelopeSweeps = state[index++];
	this.channel1envelopeSweepsLast = state[index++];
	this.channel1consecutive = state[index++];
	this.channel1frequency = state[index++];
	this.channel1SweepFault = state[index++];
	this.channel1ShadowFrequency = state[index++];
	this.channel1timeSweep = state[index++];
	this.channel1lastTimeSweep = state[index++];
	this.channel1Swept = state[index++];
	this.channel1frequencySweepDivider = state[index++];
	this.channel1decreaseSweep = state[index++];
	this.channel2FrequencyTracker = state[index++];
	this.channel2FrequencyCounter = state[index++];
	this.channel2totalLength = state[index++];
	this.channel2envelopeVolume = state[index++];
	this.channel2envelopeType = state[index++];
	this.channel2envelopeSweeps = state[index++];
	this.channel2envelopeSweepsLast = state[index++];
	this.channel2consecutive = state[index++];
	this.channel2frequency = state[index++];
	this.channel3canPlay = state[index++];
	this.channel3totalLength = state[index++];
	this.channel3patternType = state[index++];
	this.channel3frequency = state[index++];
	this.channel3consecutive = state[index++];
	this.channel3PCM = this.toTypedArray(state[index++], "int8");
	this.channel4FrequencyPeriod = state[index++];
	this.channel4lastSampleLookup = state[index++];
	this.channel4totalLength = state[index++];
	this.channel4envelopeVolume = state[index++];
	this.channel4currentVolume = state[index++];
	this.channel4envelopeType = state[index++];
	this.channel4envelopeSweeps = state[index++];
	this.channel4envelopeSweepsLast = state[index++];
	this.channel4consecutive = state[index++];
	this.channel4BitRange = state[index++];
	this.soundMasterEnabled = state[index++];
	this.VinLeftChannelMasterVolume = state[index++];
	this.VinRightChannelMasterVolume = state[index++];
	this.leftChannel1 = state[index++];
	this.leftChannel2 = state[index++];
	this.leftChannel3 = state[index++];
	this.leftChannel4 = state[index++];
	this.rightChannel1 = state[index++];
	this.rightChannel2 = state[index++];
	this.rightChannel3 = state[index++];
	this.rightChannel4 = state[index++];
	this.channel1currentSampleLeft = state[index++];
	this.channel1currentSampleRight = state[index++];
	this.channel2currentSampleLeft = state[index++];
	this.channel2currentSampleRight = state[index++];
	this.channel3currentSampleLeft = state[index++];
	this.channel3currentSampleRight = state[index++];
	this.channel4currentSampleLeft = state[index++];
	this.channel4currentSampleRight = state[index++];
	this.channel1currentSampleLeftSecondary = state[index++];
	this.channel1currentSampleRightSecondary = state[index++];
	this.channel2currentSampleLeftSecondary = state[index++];
	this.channel2currentSampleRightSecondary = state[index++];
	this.channel3currentSampleLeftSecondary = state[index++];
	this.channel3currentSampleRightSecondary = state[index++];
	this.channel4currentSampleLeftSecondary = state[index++];
	this.channel4currentSampleRightSecondary = state[index++];
	this.channel1currentSampleLeftTrimary = state[index++];
	this.channel1currentSampleRightTrimary = state[index++];
	this.channel2currentSampleLeftTrimary = state[index++];
	this.channel2currentSampleRightTrimary = state[index++];
	this.mixerOutputCache = state[index++];
	this.channel1DutyTracker = state[index++];
	this.channel1CachedDuty = state[index++];
	this.channel2DutyTracker = state[index++];
	this.channel2CachedDuty = state[index++];
	this.channel1Enabled = state[index++];
	this.channel2Enabled = state[index++];
	this.channel3Enabled = state[index++];
	this.channel4Enabled = state[index++];
	this.sequencerClocks = state[index++];
	this.sequencePosition = state[index++];
	this.channel3Counter = state[index++];
	this.channel4Counter = state[index++];
	this.cachedChannel3Sample = state[index++];
	this.cachedChannel4Sample = state[index++];
	this.channel3FrequencyPeriod = state[index++];
	this.channel3lastSampleLookup = state[index++];
	this.actualScanLine = state[index++];
	this.lastUnrenderedLine = state[index++];
	this.queuedScanLines = state[index++];
	this.RTCisLatched = state[index++];
	this.latchedSeconds = state[index++];
	this.latchedMinutes = state[index++];
	this.latchedHours = state[index++];
	this.latchedLDays = state[index++];
	this.latchedHDays = state[index++];
	this.RTCSeconds = state[index++];
	this.RTCMinutes = state[index++];
	this.RTCHours = state[index++];
	this.RTCDays = state[index++];
	this.RTCDayOverFlow = state[index++];
	this.RTCHALT = state[index++];
	this.usedBootROM = state[index++];
	this.skipPCIncrement = state[index++];
	this.STATTracker = state[index++];
	this.gbcRamBankPositionECHO = state[index++];
	this.numRAMBanks = state[index++];
	this.windowY = state[index++];
	this.windowX = state[index++];
	this.gbcOBJRawPalette = this.toTypedArray(state[index++], "uint8");
	this.gbcBGRawPalette = this.toTypedArray(state[index++], "uint8");
	this.gbOBJPalette = this.toTypedArray(state[index++], "int32");
	this.gbBGPalette = this.toTypedArray(state[index++], "int32");
	this.gbcOBJPalette = this.toTypedArray(state[index++], "int32");
	this.gbcBGPalette = this.toTypedArray(state[index++], "int32");
	this.gbBGColorizedPalette = this.toTypedArray(state[index++], "int32");
	this.gbOBJColorizedPalette = this.toTypedArray(state[index++], "int32");
	this.cachedBGPaletteConversion = this.toTypedArray(state[index++], "int32");
	this.cachedOBJPaletteConversion = this.toTypedArray(state[index++], "int32");
	this.BGCHRBank1 = this.toTypedArray(state[index++], "uint8");
	this.BGCHRBank2 = this.toTypedArray(state[index++], "uint8");
	this.haltPostClocks = state[index++];
	this.interruptsRequested = state[index++];
	this.interruptsEnabled = state[index++];
	this.checkIRQMatching();
	this.remainingClocks = state[index++];
	this.colorizedGBPalettes = state[index++];
	this.backgroundY = state[index++];
	this.backgroundX = state[index++];
	this.CPUStopped = state[index++];
	this.audioClocksUntilNextEvent = state[index++];
	this.audioClocksUntilNextEventCounter = state[index];
	this.fromSaveState = true;
	this.TICKTable = this.toTypedArray(this.TICKTable, "uint8");
	this.SecondaryTICKTable = this.toTypedArray(this.SecondaryTICKTable, "uint8");
	this.initializeReferencesFromSaveState();
	this.memoryReadJumpCompile();
	this.memoryWriteJumpCompile();
	this.initLCD();
	this.initSound();
	this.noiseSampleTable = (this.channel4BitRange == 0x7FFF) ? this.LSFR15Table : this.LSFR7Table;
	this.channel4VolumeShifter = (this.channel4BitRange == 0x7FFF) ? 15 : 7;
}

module.exports.saveState = saveState;
module.exports.returnFromState = returnFromState;