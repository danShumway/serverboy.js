GameBoyCore.prototype.interpretCartridge = function () {
  var extra;

  if (this.ROMImageIsString) {
    // ROM name
    for (var index = 0x134; index < 0x13F; index++) {
      if (this.ROMImage[index] > 0) {
        this.name += this.ROMImage[index];
      }
    }
    // ROM game code (for newer games)
    for (var index = 0x13F; index < 0x143; index++) {
      if (this.ROMImage[index] > 0) {
        this.gameCode += this.ROMImage[index];
      }
    }

    extra = this.ROMImage[0x143];
  } else {
    // ROM name
    for (var index = 0x134; index < 0x13F; index++) {
      if (this.ROMImage[index] > 0) {
        this.name += String.fromCharCode(this.ROMImage[index]);
      }
    }
    // ROM game code (for newer games)
    for (var index = 0x13F; index < 0x143; index++) {
      if (this.ROMImage[index] > 0) {
        this.gameCode += String.fromCharCode(this.ROMImage[index]);
      }
    }
    
    extra = String.fromCharCode(this.ROMImage[0x143]);
  }

  debug("Game Title: " + this.name + "[" + this.gameCode + "][" + extra + "]", 0);
  debug("Game Code: " + this.gameCode, 0);
  // Cartridge type
  this.cartridgeType = this.ROM[0x147];
  debug("Cartridge type #" + this.cartridgeType, 0);
  //Map out ROM cartridge sub-types.
  var MBCType = "";
  switch (this.cartridgeType) {
    case 0x00:
      //ROM w/o bank switching
      if (!this.opts.mbc1) {
        MBCType = "ROM";
        break;
      }
    case 0x01:
      this.cMBC1 = true;
      MBCType = "MBC1";
      break;
    case 0x02:
      this.cMBC1 = true;
      this.cSRAM = true;
      MBCType = "MBC1 + SRAM";
      break;
    case 0x03:
      this.cMBC1 = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "MBC1 + SRAM + BATT";
      break;
    case 0x05:
      this.cMBC2 = true;
      MBCType = "MBC2";
      break;
    case 0x06:
      this.cMBC2 = true;
      this.cBATT = true;
      MBCType = "MBC2 + BATT";
      break;
    case 0x08:
      this.cSRAM = true;
      MBCType = "ROM + SRAM";
      break;
    case 0x09:
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "ROM + SRAM + BATT";
      break;
    case 0x0B:
      this.cMMMO1 = true;
      MBCType = "MMMO1";
      break;
    case 0x0C:
      this.cMMMO1 = true;
      this.cSRAM = true;
      MBCType = "MMMO1 + SRAM";
      break;
    case 0x0D:
      this.cMMMO1 = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "MMMO1 + SRAM + BATT";
      break;
    case 0x0F:
      this.cMBC3 = true;
      this.cTIMER = true;
      this.cBATT = true;
      MBCType = "MBC3 + TIMER + BATT";
      break;
    case 0x10:
      this.cMBC3 = true;
      this.cTIMER = true;
      this.cBATT = true;
      this.cSRAM = true;
      MBCType = "MBC3 + TIMER + BATT + SRAM";
      break;
    case 0x11:
      this.cMBC3 = true;
      MBCType = "MBC3";
      break;
    case 0x12:
      this.cMBC3 = true;
      this.cSRAM = true;
      MBCType = "MBC3 + SRAM";
      break;
    case 0x13:
      this.cMBC3 = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "MBC3 + SRAM + BATT";
      break;
    case 0x19:
      this.cMBC5 = true;
      MBCType = "MBC5";
      break;
    case 0x1A:
      this.cMBC5 = true;
      this.cSRAM = true;
      MBCType = "MBC5 + SRAM";
      break;
    case 0x1B:
      this.cMBC5 = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "MBC5 + SRAM + BATT";
      break;
    case 0x1C:
      this.cRUMBLE = true;
      MBCType = "RUMBLE";
      break;
    case 0x1D:
      this.cRUMBLE = true;
      this.cSRAM = true;
      MBCType = "RUMBLE + SRAM";
      break;
    case 0x1E:
      this.cRUMBLE = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "RUMBLE + SRAM + BATT";
      break;
    case 0x1F:
      this.cCamera = true;
      MBCType = "GameBoy Camera";
      break;
    case 0x22:
      this.cMBC7 = true;
      this.cSRAM = true;
      this.cBATT = true;
      MBCType = "MBC7 + SRAM + BATT";
      break;
    case 0xFD:
      this.cTAMA5 = true;
      MBCType = "TAMA5";
      break;
    case 0xFE:
      this.cHuC3 = true;
      MBCType = "HuC3";
      break;
    case 0xFF:
      this.cHuC1 = true;
      MBCType = "HuC1";
      break;
    default:
      MBCType = "Unknown";
      this.emit('error', new Error("Cartridge type is unknown."));
  }
  debug("Cartridge Type: " + MBCType + ".", 0);
  // ROM and RAM banks
  this.numROMBanks = this.ROMBanks[this.ROM[0x148]];
  debug(this.numROMBanks + " ROM banks.", 0);
  switch (this.RAMBanks[this.ROM[0x149]]) {
    case 0:
      debug("No RAM banking requested for allocation or MBC is of type 2.", 0);
      break;
    case 2:
      debug("1 RAM bank requested for allocation.", 0);
      break;
    case 3:
      debug("4 RAM banks requested for allocation.", 0);
      break;
    case 4:
      debug("16 RAM banks requested for allocation.", 0);
      break;
    default:
      debug("RAM bank amount requested is unknown, will use maximum allowed by specified MBC type.", 0);
  }
  //Check the GB/GBC mode byte:
  if (!this.usedBootROM) {
    switch (this.ROM[0x143]) {
      case 0x00:  //Only GB mode
        this.cGBC = false;
        debug("Only GB mode detected.", 0);
        break;
      case 0x32:  //Exception to the GBC identifying code:
        if (!this.opts.prioritizeGb && this.name + this.gameCode + this.ROM[0x143] == "Game and Watch 50") {
          this.cGBC = true;
          debug("Created a boot exception for Game and Watch Gallery 2 (GBC ID byte is wrong on the cartridge).", 1);
        }
        else {
          this.cGBC = false;
        }
        break;
      case 0x80:  //Both GB + GBC modes
        this.cGBC = !this.opts.prioritizeGb;
        debug("GB and GBC mode detected.", 0);
        break;
      case 0xC0:  //Only GBC mode
        this.cGBC = true;
        debug("Only GBC mode detected.", 0);
        break;
      default:
        this.cGBC = false;
        debug("Unknown GameBoy game type code #" + this.ROM[0x143] + ", defaulting to GB mode (Old games don't have a type code).", 1);
    }
    this.inBootstrap = false;
    this.setupRAM();  //CPU/(V)RAM initialization.
    this.initSkipBootstrap();
  }
  else {
    this.cGBC = this.usedGBCBootROM;  //Allow the GBC boot ROM to run in GBC mode...
    this.setupRAM();  //CPU/(V)RAM initialization.
    this.initBootstrap();
  }
  this.initializeModeSpecificArrays();
  //License Code Lookup:
  var cOldLicense = this.ROM[0x14B];
  var cNewLicense = (this.ROM[0x144] & 0xFF00) | (this.ROM[0x145] & 0xFF);
  if (cOldLicense != 0x33) {
    //Old Style License Header
    debug("Old style license code: " + cOldLicense, 0);
  }
  else {
    //New Style License Header
    debug("New style license code: " + cNewLicense, 0);
  }
  this.ROMImage = ""; //Memory consumption reduction.
};
GameBoyCore.prototype.disableBootROM = function () {
  //Remove any traces of the boot ROM from ROM memory.
  for (var index = 0; index < 0x100; ++index) {
    this.memory[index] = this.ROM[index]; //Replace the GameBoy or GameBoy Color boot ROM with the game ROM.
  }
  if (this.usedGBCBootROM) {
    //Remove any traces of the boot ROM from ROM memory.
    for (index = 0x200; index < 0x900; ++index) {
      this.memory[index] = this.ROM[index]; //Replace the GameBoy Color boot ROM with the game ROM.
    }
    if (!this.cGBC) {
      //Clean up the post-boot (GB mode only) state:
      this.GBCtoGBModeAdjust();
    }
    else {
      this.recompileBootIOWriteHandling();
    }
  }
  else {
    this.recompileBootIOWriteHandling();
  }
};
