GameBoyCore.prototype.ROMLoad = function () {
    //Load the first two ROM banks (0x0000 - 0x7FFF) into regular gameboy memory:
    this.ROM = [];
    this.usedBootROM = settings[1] && ((!settings[11] && this.GBCBOOTROM.length == 0x800) || (settings[11] && this.GBBOOTROM.length == 0x100));
    var maxLength = this.ROMImage.length;
    if (maxLength < 0x4000) {
        throw(new Error("ROM image size too small."));
    }
    this.ROM = this.getTypedArray(maxLength, 0, "uint8");
    var romIndex = 0;
    if (this.usedBootROM) {
        if (!settings[11]) {
            //Patch in the GBC boot ROM into the memory map:
            for (; romIndex < 0x100; ++romIndex) {
                this.memory[romIndex] = this.GBCBOOTROM[romIndex];                                          //Load in the GameBoy Color BOOT ROM.
                this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);                           //Decode the ROM binary for the switch out.
            }
            for (; romIndex < 0x200; ++romIndex) {
                this.memory[romIndex] = this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);   //Load in the game ROM.
            }
            for (; romIndex < 0x900; ++romIndex) {
                this.memory[romIndex] = this.GBCBOOTROM[romIndex - 0x100];                                  //Load in the GameBoy Color BOOT ROM.
                this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);                           //Decode the ROM binary for the switch out.
            }
            this.usedGBCBootROM = true;
        }
        else {
            //Patch in the GBC boot ROM into the memory map:
            for (; romIndex < 0x100; ++romIndex) {
                this.memory[romIndex] = this.GBBOOTROM[romIndex];                                           //Load in the GameBoy Color BOOT ROM.
                this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);                           //Decode the ROM binary for the switch out.
            }
        }
        for (; romIndex < 0x4000; ++romIndex) {
            this.memory[romIndex] = this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);   //Load in the game ROM.
        }
    }
    else {
        //Don't load in the boot ROM:
        for (; romIndex < 0x4000; ++romIndex) {
            this.memory[romIndex] = this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);   //Load in the game ROM.
        }
    }
    //Finish the decoding of the ROM binary:
    for (; romIndex < maxLength; ++romIndex) {
        this.ROM[romIndex] = (this.ROMImage.charCodeAt(romIndex) & 0xFF);
    }
    this.ROMBankEdge = Math.floor(this.ROM.length / 0x4000);
    //Set up the emulator for the cartidge specifics:
    this.interpretCartridge();
    //Check for IRQ matching upon initialization:
    this.checkIRQMatching();
}