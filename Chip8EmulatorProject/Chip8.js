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
    SCALE: 0, // Because 64*32 is quite small the entire display is multiplied by SCALE, to fill up more of the webpage

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
        chip8.SCALE = 15;

        chip8.PAUSE = 0;
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
        var pageDisplay = document.getElementById("emulator_screen");
        pageDisplay.width = 64*chip8.SCALE;
        pageDisplay.height = 32*chip8.SCALE;

        var c = pageDisplay.getContext('2d');
        c.fillStyle = "#FF0000";

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
        var x = (opcode & 0x0F00) >> 8; // After extracting x, it is shifted to the second digit space (ie 0xA1C3 -> 0x0001)
        var y = (opcode & 0x00F0) >> 4; // After extracting y, it is shifted to the third digit space (ie 0xA1C3 -> 0x000C)

        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0:
                        // command to clear screen
                        chip8.clearDisplay();
                        break;

                    case 0x00EE:
                        // chip8.PC = ???
                        // chip8.SP--
                        // break;
                }
                break;

            case 0x1000:
                // command to jump to instruction at nnn
                chip8.PC = opcode & 0x0FFF;
                break;

            case 0x2000:
                // command to call function at nnn
                chip8.SP++;
                chip8.STACK[chip8.SP] = chip8.PC;
                chip8.PC = opcode & 0x0FFF;
                break;

            case 0x3000:
                // 3xkk - Skip to next line if register Vx is equal to the byte kk
                if (chip8.VREGISTER[x] == opcode & 0x00FF) {
                  chip8.PC += 2;
                }
                break;

            case 0x4000:
                // 4xkk - Skip to next line if register Vx is not equal to the byte kk
                if (chip8.VREGISTER[x] != opcode & 0x00FF) {
                    chip8.PC += 2;
                }
                break;

            case 0x5000:
                // 5xy0 - Skip to next line if register Vx is equal to Vy
                if (chip8.VREGISTER[x] == chip8.VREGISTER[y]) {
                    chip8.PC += 2;
                }
                break;

            case 0x6000:
                // 6xkk - Loads value kk into register Vx
                chip8.VREGISTER[x] = (opcode & 0x00FF);
                break;

            case 0x7000:
                // 7xkk - ADD Vx, byte
                chip8.VREGISTER[x] = chip8.VREGISTER[x] + (opcode & 0x00FF);
                break;

            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000:
                        // 8xy0 - set Vx = Vy
                        chip8.VREGISTER[x] = chip8.VREGISTER[y];
                        break;

                    case 0x0001:
                        // 8xy1 - set Vx = Vx | Vy
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] | chip8.VREGISTER[y];
                        break;

                    case 0x0002:
                        // 8xy2 - set Vx = Vx & Vy
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] & chip8.VREGISTER[y];
                        break;

                    case 0x0003:
                        // 8xy3 - set Vx = Vx ^ Vy
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] ^ chip8.VREGISTER[y];
                        break;

                    case 0x0004:
                        // 8xy4 - set Vx = Vx + Vy, set carry flag VF = 1 if result is > 255, only lowest 8 bits of result
                        if ((chip8.VREGISTER[x] + chip8.VREGISTER[y]) > 255) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = (chip8.VREGISTER[x] + chip8.VREGISTER[y]) & 0x00FF;
                        break;

                    case 0x0005:
                        // 8xy5 - set Vx = Vx - Vy, set carry flag VF = 1 when not borrowing (Vy < Vx)
                        if (chip8.VREGISTER[x] > chip8.VREGISTER[y]) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] - chip8.VREGISTER[y];
                        break;

                    case 0x0006:
                        // 8xy6 - set Vx = Vx >> 1 (Vx /= 2), set VF = 1 if lowest bit of Vx is 1
                        if (chip8.VREGISTER[x] & 0x0001 == 1) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] >> 1;
                        break;

                    case 0x0007:
                        // 8xy7 - set Vx = Vy - Vx, set carry flag VF = 1 when not borrowing (Vy > Vx)
                        if (chip8.VREGISTER[x] < chip8.VREGISTER[y]) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[y] - chip8.VREGISTER[x];
                        break;

                    case 0x000E:
                        // 8xyE - set Vx = Vx << 1 (Vx *= 2), set VF = 1 if largest bit of Vx is 1
                        if ((chip8.VREGISTER[x] & 0x80) == 1) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] << 1;
                        break;
                }
                break;
            case 0x9000:
                // 9xy0 - SNE Vx, Vy
                if (chip8.VREGISTER[x] != chip8.VREGISTER[y]) {
                  chip8.PC += 2;
                }
                break;
            case 0xA000:
                // Annn - LD I, addr
                chip8.IREGISTER = (opcode & 0x0FFF);
                break;
            case 0xB000:
                // Bnnn - JP V0, addr
                chip8.PC = (opcode & 0x0FFF) + chip8.VREGISTER[0];
                break;
            case 0xC000:
                // Cxkk - RND Vx, byte
                chip8.VREGISTER[x] = ( (Math.floor((Math.random()*255))) & (opcode & 0x00FF) );
                break;
            case 0xD000:
                // Dxyn - DRW Vx, Vy, nibble
                var N = (opcode & 0x000F); // The height of the sprite
                var startX = chip8.VREGISTER[x]; // The x coordinate of the sprite
                var startY = chip8.VREGISTER[y]; // The y coordinate of the sprite
                chip8.VREGISTER[0xF] = 0; // The VF register will act as a flag for if a pixel on the display is unset
                var pixel; // The value of a pixel, taken from memory

                for (var yCoord = 0; y < N; y++) { // There are N rows of length 8 pixels
                    pixel = chip8.MEMORY[chip8.IREGISTER + yCoord]; // The value of the current pixel is taken from memory
                    for (var xCoord = 0; x < 8; x++) {
                        if ((pixel & 0x80) >= 0) { // If the current pixel is not empty
                            if (chip8.DISPLAY[startX + (64*startY)] == 0) { // Check if the current pixel is already set or not
                                chip8.DISPLAY[startX + (64*startY)] = 1; // Set the current pixel if it is unset
                            } else {
                                chip8.DISPLAY[startX + (64*startY)] = 0; // Unset the pixel if it is already set
                                chip8.VREGISTER[0xF] = 1; // Unsetting a pixel will set the VF register
                            }
                        }
                    }
                }

                updateDisplay();

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
                        chip8.VREGISTER[x] = chip8.DELAYTIMER;
                        break;
                    case 0x000A:
                        // Fx0A - LD Vx, K
                        break;
                    case 0x0015:
                        // Fx15 - LD DT, Vx
                        chip8.DELAYTIMER = chip8.VREGISTER[x];
                        break;
                    case 0x0018:
                        // Fx18 - LD ST, Vx
                        chip8.SOUNDTIMER = chip8.VREGISTER[x];
                        break;
                    case 0x001E:
                        // Fx1E - ADD I, Vx
                        chip8.IREGISTER += chip8.VREGISTER[x];
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

    //returns object containing current value of all state fields
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

    // prints out all fields of a state object
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
        printout += "MEMORY\n----------\n";
        printout += "PC: "+ state.PC + "\n";
        for(var i = 0; i < 128; i++){
            printout += (i * 32)+"-> [";
            for(var j = 0; j < 32; j++){
                printout += state.MEMORY[32*i + j] + ".";
            }
            printout += "] <-" + ((i+1) * 32) + "\n";
        }
        console.log(printout)
        return printout;
    },

    //returns state object with fields equal to the difference between input states
    stateCompare(state1, state2){
        var comp = {};
        comp.PC = state2.PC - state1.PC;
        comp.IREGISTER = state2.IREGISTER - state1.IREGISTER;
        comp.SP = state2.SP - state1.SP;
        comp.DELAYTIMER = state2.DELAYTIMER - state1.DELAYTIMER;
        comp.SOUNDTIMER = state2.SOUNDTIMER - state1.SOUNDTIMER;
        comp.STACK = new Uint8Array(16);
        comp.VREGISTER = new Uint8Array(16);
        comp.MEMORY = new Uint8Array(4096);
        for(var i = 0; i < 16; i++){
            comp.STACK[i] = state2.STACK[i] - state1.STACK[i];
            comp.VREGISTER[i] = state2.VREGISTER[i] - state1.VREGISTER[i];
        }
        for(var i = 0; i < 2096; i++){
            comp.MEMORY[i] = state2.MEMORY[i] - state1.MEMORY[i];
        }
        return comp;
    },

    //prints difference between states before and after running an opcode
    testOpcode(opcode){
        state1 = chip8.stateDump();
        chip8.execute(opcode);
        state2 = chip8.stateDump();
        comp = chip8.stateCompare(state1,state2)
        chip8.statePrint(chip8.stateCompare(state1,state2));
    },

};

// THESE FUNCTION CALLS BELOW WILL RUN WHEN THE HTML PAGE IS OPENED
// USED FOR TESTING
chip8.reset();
chip8.emulateCycle();