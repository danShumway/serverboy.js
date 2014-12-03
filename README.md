serverboy.js
============

Pure nodeJS gameboy emulator with hooks for scripting and streaming output, adapted from both https://github.com/grantgalitz/GameBoy-Online and https://github.com/guille/gameboy to remove canvas requirements and allow the emulator to run in a pure NodeJS environment with no additional dependencies of any kind.

Specifically, Serverboy has been adapted to be more scriptable and autimated; the core is capapble of emulating on a frame-by-frame basis, rather than starting at a given speed and running continuously, having input passed in on a frame-by-frame basis (for scripting or capturing user input from a remote client), and for outputing memory (for analyzing the state of the game at any given moment).

Serverboy is in very alpha stages, and likely is not production ready for your needs. It is being maintained and developed primarily to be used in conjunction with https://github.com/danShumway/Piglet, a Lua based AI that attempts to "solve" gameboy and gameboy color games using machine learning techniques, however, I will be maintaining and updating the module to the best of my ability as Piglet evolves until it is a mature, versitile emulator that can be adapted for a variety of situations.

At this stage in development, it is likely that the project still has bugs or quirks.  In specific, I have not ported over any of the sound code or done extensive testing. 

An example file is available in examples/streaming that shows how the emulator could take in input and stream output to a remote canvas.  In the future, this README will be updated with more extensive documentation.
