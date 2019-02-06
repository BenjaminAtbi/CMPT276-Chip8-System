var chip8 = {

    PC: 0, // The program counter
    MEMORY: new Uint8Array(4096), // Chip 8 memory, 4096 bytes long, Chip 8 programs are stored starting from the 512th byte (0x200)
    VREGISTER: new Uint8Array(16), // 8 bit data registers, there are 16, VF doubles as a flag
    IREGISTER: 0, // 16 bit data register, used for memory operations

    STACK: new Uint16Array(16), // The stack has 16 levels
    SP: 0, // The stack pointer

    DELAYTIMER: 0, // Timer used for timing events
    SOUNDTIMER: 0, // Timer used for sound effects, a beep is made when the timer is nonzero

    DISPLAY: new Uint8Array(64 * 32), // The display resolution is 64 * 32, color is monochrome
    SCALE: 15, // Because 64*32 is quite small the entire display is multiplied by SCALE, to fill up more of the webpage

    CYCLES: 10, // The number of cycles to run at a time per loop
    PAUSE: 0, // Whether or not the emulator cycles are paused

    reset() {
        chip8.PC = 0x200; // Point the program counter to the start of the program memeory
        chip8.MEMORY = chip8.MEMORY.map(()=>0);
        chip8.VREGISTER = chip8.VREGISTER.map(()=>0);
        chip8.IREGISTER = 0;

        chip8.STACK = chip8.STACK.map(()=>0);
        chip8.SP = 0;

        chip8.DELAYTIMER = 0;
        chip8.SOUNDTIMER = 0;

        chip8.DISPLAY = chip8.DISPLAY.map(()=>0);

        chip8.PAUSE = 0;
        console.log(chip8.PAUSE);
    },

    // Load a given program into memory
    loadProgram(program) {
            for (var i = 0; i < program.length; i++) {
                chip8.MEMORY[0x200 + i] = program[i];
            }
    },

    // Run a CPU cycle
    emulateCycle() {
        for (var i = 0; i < chip8.CYCLES; i++) {
            if(!chip8.PAUSE) {
                //get opcode in format 0x0000
                var opcode = chip8.MEMORY[chip8.PC] << 8 | chip8.MEMORY[chip8.PC + 1]; // Decode command
                chip8.PC += 2;
                chip8.execute(opcode); // Execute command
            }
        }

        if(!chip8.PAUSE) {
            chip8.updateTimers();
        }

        chip8.beep();
        chip8.updateDisplay();
    },

    updateTimers() {
        if (chip8.DELAYTIMER > 0) chip8.DELAYTIMER--;
        if (chip8.SOUNDTIMER > 0) chip8.SOUNDTIMER--;
    },

    updateDisplay() {
        var pageDisplay = document.querySelector('canvas');
        pageDisplay.width = 64*chip8.SCALE;
        pageDisplay.height = 32*chip8.SCALE;

        var c = pageDisplay.getContext('2d');

        for (var x = 0; x < 64; x++) {
            for (var y = 0; y < 32; y++) {
                if (chip8.DISPLAY[y*64 + x] == 1) c.fillRect(x*chip8.SCALE,y*chip8.SCALE,chip8.SCALE,chip8.SCALE);
            }
        }

    },

    // Reset the display
    clearDisplay() {
    		chip8.DISPLAY = chip8.DISPLAY.map(()=>0);
    },

    beep() {
        if(chip8.SOUNDTIMER > 0) {
            // SPEAKER PLAY
        } else {
            // SPEAKER STOP
        }
    },

    execute(opcode) {
        switch (opcode & 0xF000) { // check first part of number (ie 0xA1B2 & 0xF000 = 0xA000)
            case 0x0000:
            		switch (opcode & 0x00FF) { // check last two parts
                		// 0nnn - SYS addr idk what this does probably don't need it
										// 00E0 - Clears the screen
										case 0x00E0:
												chip8.clearDisplay();
												break;

										// 00EE - Returns from a subroutine this one's pretty hard to grasp have to make sure it works correctly
										// 	need to set program counter to top of stack and decrement stack pointer
										case 0x00EE:
												chip8.PC = ???
												chip8.SP--;
                }
                break;

          	case 0x1000:
                // 1nnn - Jump to address (aka set program counter to address nnn)
								chip8.PC = opcode & 0x0FFF;
                break;

            case 0x2000:
                // 2nnn - Call a subroutine at address nnn similar stuff to return
								chip8.SP++;
								chip8.STACK[chip8.SP] = chip8.PC;
								chip8.PC = opcode & 0x0FFF;
                break;

            case 0x3000:
                // 3xkk - SE Vx, byte
                break;

            case 0x4000:
                // 4xkk - SNE Vx, byte
                break;

            case 0x5000:
            case 0x6000:
                // 6xkk - LD Vx, byte
                break;
            case 0x7000:
                // 7xkk - ADD Vx, byte
                break;
            case 0x8000:
                // 8xy0 - LD Vx, Vy
                // 8xy1 - OR Vx, Vy
                // 8xy2 - AND Vx, Vy
                // 8xy3 - XOR Vx, Vy
                // 8xy4 - ADD Vx, Vy
                // 8xy5 - SUB Vx, Vy
                // 8xy6 - SHR Vx {, Vy}
                // 8xy7 - SUBN Vx, Vy
                // 8xyE - SHL Vx {, Vy}
                break;
            case 0x9000:
                // 9xy0 - SNE Vx, Vy
                break;
            case 0xA000:
                // Annn - LD I, addr
                break;
            case 0xB000:
                // Bnnn - JP V0, addr
                break;
            case 0xC000:
                // Cxkk - RND Vx, byte
                break;
            case 0xD000:
                // Dxyn - DRW Vx, Vy, nibble
                break;
            case 0xE000:
                // Ex9E - SKP Vx
                // ExA1 - SKNP Vx
                break;
            case 0xF000:
                // Fx07 - LD Vx, DT
                // Fx0A - LD Vx, K
                // Fx15 - LD DT, Vx
                // Fx18 - LD ST, Vx
                // Fx1E - ADD I, Vx
                // Fx29 - LD F, Vx
                // Fx33 - LD B, Vx
                // Fx55 - LD [I], Vx
                // Fx65 - LD Vx, [I]
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    },

};

// THESE FUNCTION CALLS BELOW WILL RUN WHEN THE HTML PAGE IS OPENED
// USED FOR TESTING
chip8.reset();
chip8.emulateCycle();
