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
        // Using AND on an opcode with 0xF000 will give back the opcode with only the digit corresponding to F, with the other digits = 0
        var x = (opcode & 0x0F00) >> 8; // After extracting x, it is shifted to the second digit space
        var y = (opcode & 0x00F0) >> 4; // After extrcting y, it is shifted to the third digit space

        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0:
                        chip8.clearDisplay();
                        break;
                    case 0x00EE:
                        // chip8.PC = ???
                        // chip8.SP--
                        // break;
                }
                break;
            case 0x1000:
                chip8.PC = opcode & 0x0FFF;
                break;
            case 0x2000:
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
                // 5xy0 - SE Vx, Vy
                break;
            case 0x6000:
                // 6xkk - LD Vx, byte
                break;
            case 0x7000:
                // 7xkk - ADD Vx, byte
                break;
            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000:
                        // 8xy0 - LD Vx, Vy
                        break;
                    case 0x0001:
                        // 8xy1 - OR Vx, Vy
                        break;
                    case 0x0002:
                        // 8xy2 - AND Vx, Vy
                        break;
                    case 0x0003:
                        // 8xy3 - XOR Vx, Vy
                        break;
                    case 0x0004:
                        // 8xy4 - ADD Vx, Vy
                        break;
                    case 0x0005:
                        // 8xy5 - SUB Vx, Vy
                        break;
                    case 0x0006:
                        // 8xy6 - SHR Vx {, Vy}
                        break;
                    case 0x0007:
                        // 8xy7 - SUBN Vx, Vy
                        break;
                    case 0x000E:
                        // 8xyE - SHL Vx {, Vy}
                        break;
                }
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
                switch (opcode & 0x00FF) {
                    case 0x009E:
                        // Ex9E - SKP Vx
                        break;
                    case 0x00A1:
                        // ExA1 - SKNP Vx
                        break;
                }
                break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007:
                        // Fx07 - LD Vx, DT
                        break;
                    case 0x000A:
                        // Fx0A - LD Vx, K
                        break;
                    case 0x0015:
                        // Fx15 - LD DT, Vx
                        break;
                    case 0x0018:
                        // Fx18 - LD ST, Vx
                        break;
                    case 0x001E:
                        // Fx1E - ADD I, Vx
                        break;
                    case 0x0029:
                        // Fx29 - LD F, Vx
                        break;
                    case 0x0033:
                        // Fx33 - LD B, Vx
                        break;
                    case 0x0055:
                        // Fx55 - LD [I], Vx
                        break;
                    case 0x0065:
                        // Fx65 - LD Vx, [I]
                        break;
                }
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    },

    // Test Functions
    stateDump(){
        return {
            PC: chip8.PC, // The program counter
            MEMORY: chip8.MEMORY, // Chip 8 memory, 4096 bytes long, Chip 8 programs are stored starting from the 512th byte (0x200)
            VREGISTER: chip8.VREGISTER, // 8 bit data registers, there are 16, VF doubles as a flag
            IREGISTER: chip8.IREGISTER, // 16 bit data register, used for memory operations
        
            STACK: chip8.STACK, // The stack has 16 levels
            SP: chip8.SP, // The stack pointer
        
            DELAYTIMER: chip8.DELAYTIMER, // Timer used for timing events
            SOUNDTIMER: chip8.SOUNDTIMER, // Timer used for sound effects, a beep is made when the timer is nonzero
        
            DISPLAY: chip8.DISPLAY, // The display resolution is 64 * 32, color is monochrome
            SCALE: chip8.SCALE, // Because 64*32 is quite small the entire display is multiplied by SCALE, to fill up more of the webpage
        
            CYCLES: chip8.CYCLES, // The number of cycles to run at a time per loop
            PAUSE: chip8.PAUSE, // Whether or not the emulator cycles are paused
        
        }
    },

    statePrint(state){
        var printout = "REGISTERS\n---------\n";
        for(var i = 0; i<16; i++){
            printout += "reg" + i + ": " + state.VREGISTER[i]+"\n";
        }
        printout += "ireg: " + state.IREGISTER + "\n";
        printout += "TIMERS\n----------\n";
        printout += "delay timer: " + state.DELAYTIMER + "\n";
        printout += "sound timer: " + state.SOUNDTIMER + "\n";
        printout += "STACK\n----------\n";
        printout += "SP: "+state.SP+"\n 0 -> [";
        for(var i = 0; i < 16; i++){
            printout += state.STACK[i] + "."; 
        }
        printout += "] <-16\n";
        printout += "MEMORY\n----------\n 0 -> [";
        printout += "PC: "+ state.PC + "\n";
        for(var i = 0; i < 128; i++){
            printout += (i * 32)+"-> [";
            for(var j = 0; j < 32; j++){
                printout += state.MEMORY[32*i + j] + ".";
            }
            printout += "] <-" + ((i+1) * 32) + "\n";
        }
        return printout;
    },

};

// THESE FUNCTION CALLS BELOW WILL RUN WHEN THE HTML PAGE IS OPENED
// USED FOR TESTING
chip8.reset();
chip8.emulateCycle();
