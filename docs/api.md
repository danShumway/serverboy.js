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

This is the only way to move the emulator forward.

## ``pressKey()``

Press a single key. Keys are automatically released at the end of each frame.
Calling ``pressKey`` on the same key across multiple frames will act as if the
key was being held down.

Use ``KEYMAP`` to determine what to pass in.

## ``pressKeys()``

``pressKey``, except it takes an array of keys instead of a single one.

## ``getMemory()``

Returns an array containing the entire gameboy memory contents, divided into
roughly 64,000 256 bit chunks.

There is not (currently) an official way to set memory contents, but this will
be coming in the future.

## ``getAudio()``

Returns raw PCM audio data in an array. Audio is still a work in progress,
so I'm unable to 

## ``getScreen()``

Returns an array of pixel data, divided into 4 RGBA chunks for each pixel. This
is a fairly standard format for pixel data which makes it easy to write to
different mediums and manipulate or add filters.

The resolution of the gameboy is 160 pixels wide by 144 pixels high.

```js
var screen = gameboy.getScreen();

//write to canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var data = ctx.createImageData(160, 144);
for (let i=0; i<screen.length; i++) {
    data[i] = screen[i];
}
ctx.putImageData(data, 0, 0);

//write to PNG (using pngjs)
var png = new PNG({ width: 160, height: 144 });
for (let i=0; i<screen.length; i++) {
   png.data[i] = screen[i];
}

var buffer = PNG.sync.write(png);
```

## ``KEYMAP``

An enum showing the available keys to press:

- RIGHT
- LEFT
- UP
- DOWN
- A
- B
- SELECT
- START

```js
gameboy.pressKey(Gameboy.KEYMAP.DOWN);
```

# General Notes

## Refresh rates

Gameboy logic runs at a real-world speed of approximately 120 fps. The
real-world refresh rate for the screen is slightly less than 60fps. If you are
working with screen data, you may wish to skip rendering/examining every other
frame.
