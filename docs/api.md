# API - v0.1

## Construction

Serverboy doesn't use any globals, so you can safely construct and run multiple
instances at the same time.

```js
var gameboy = new Gameboy();
```

## ``loadRom(rom)``

Roms are passed in as
[buffers](https://nodejs.org/api/buffer.html#buffer_class_buffer), not as file
objects or paths. This is because you might want to load a rom over a network
from a separate repository.

Roms are loaded synchronously.

```js
var fs = require('fs');
var file_path = './roms/my_rom.gb';
var rom = fs.readFileSync(file_path);

gameboy.loadRom(rom);
```

When a rom is loaded, Serverboy immediately starts running. However, because
Serverboy does not auto-advance frames, you are free to leave the emulator in
this state while you do other things.

## ``doFrame()``

Advances the gameboy instance by one frame.

## ``pressKey()``

## ``pressKeys()``

## ``getKeys()``

## ``getMemory()``

## ``getAudio()``

## ``getScreen()``

## ``KEYMAP``
