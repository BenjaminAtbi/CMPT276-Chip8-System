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
    SCALE: 10, // Because the resolution of 64*32 is quite small the screen is scaled up for visibility

    KEYS: new keyInput(), // Holds an array of all possible keys and whether they have been pressed

    CYCLES: 10, // The number of cycles to run at a time per loop
    PAUSE: 0, // Whether or not the emulator cycles are paused
    NEXT: 0, // Whether or not the next button has been clicked

    INSTRUCTINFO: new Array("OPCODE","NAME","DESC"),

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
        chip8.SCALE = 10;

        chip8.loadFont();
        chip8.KEYS = new keyInput();

        chip8.PAUSE = 0;
        chip8.NEXT = 0;
    },

    // Load a given program into memory
    loadProgram(program) {
            for (var i = 0; i < program.length; i++) {
                chip8.MEMORY[0x200 + i*2] = program[i] >> 8
                chip8.MEMORY[0x200 + i*2 + 1] = program[i] & 0x00FF
            }
    },

    // Load the array of character sprites into memory
    loadFont() {
        var font = [
              0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
              0x20, 0x60, 0x20, 0x20, 0x70, // 1
              0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
              0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
              0x90, 0x90, 0xF0, 0x10, 0x10, // 4
              0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
              0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
              0xF0, 0x10, 0x20, 0x40, 0x40, // 7
              0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
              0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
              0xF0, 0x90, 0xF0, 0x90, 0x90, // A
              0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
              0xF0, 0x80, 0x80, 0x80, 0xF0, // C
              0xE0, 0x90, 0x90, 0x90, 0xE0, // D
              0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
              0xF0, 0x80, 0xF0, 0x80, 0x80 // F
          ];

          for (i = 0; i < font.length; i++) {
              chip8.MEMORY[i] = font[i];
          }
    },

    // Run a CPU cycle
    emulateCycle() {
        if(!chip8.PAUSE || chip8.NEXT) {
            var opcode = chip8.MEMORY[chip8.PC] << 8 | chip8.MEMORY[chip8.PC + 1]; // Decode command
            chip8.PC += 2;
            chip8.execute(opcode); // Execute command
            chip8.updateTimers();
        }

        chip8.beep();
        chip8.updateDisplay();
        chip8.updateVisualizer();
    },

    nextCycle() {
        chip8.NEXT = 1;
        chip8.emulateCycle();
        chip8.NEXT = 0;
    },

    updateTimers() {
        if (chip8.DELAYTIMER > 0) chip8.DELAYTIMER--;
        if (chip8.SOUNDTIMER > 0) chip8.SOUNDTIMER--;
    },

    updateDisplay() {
        var pageDisplay = document.getElementById("emulator_screen");
        var c = pageDisplay.getContext('2d');

        for (var x = 0; x < 64; x++) {
            for (var y = 0; y < 32; y++) {
                if (chip8.DISPLAY[y*64 + x] == 1) c.fillRect(x*chip8.SCALE,y*chip8.SCALE,chip8.SCALE,chip8.SCALE);
            }
        }

    },

    togglePause() {
            if(!chip8.PAUSE) {
                chip8.PAUSE = 1;
                document.getElementById("PauseLabel").innerHTML = "Execution Paused";
            } else {
                chip8.PAUSE = 0;
                document.getElementById("PauseLabel").innerHTML = "Execution Unpaused";
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

    setPixel(x,y) {

        var xCoord = x;
        var yCoord = y;

        if (xCoord > 64) { // If the set pixel is outside the bounds of the display it is reduced
            xCoord -= 64;
        } else if (xCoord < 0) {
            xCoord += 64;
        }

        if (yCoord > 32) {
            yCoord -= 32;
        } else if (yCoord < 0) {
            yCoord += 32;
        }

        chip8.DISPLAY[xCoord + (yCoord*64)] ^= 1; // Xor the pixel to flip it from on to off or vice versa

    },

    execute(opcode) {
        // Using AND on an opcode with 0xF000 will give back the opcode with only the digit corresponding to F, with the other digits = 0
        var x = (opcode & 0x0F00) >> 8; // After extracting x, it is shifted to the second digit space (ie 0xA1C3 -> 0x0001)
        var y = (opcode & 0x00F0) >> 4; // After extracting y, it is shifted to the third digit space (ie 0xA1C3 -> 0x000C)

        chip8.INSTRUCTINFO[0] = "0x" + opcode.toString(16);

        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0:
                    chip8.INSTRUCTINFO[1] = "CLS";
                    chip8.INSTRUCTINFO[2] = "Clear the display.";
                        chip8.clearDisplay();
                        break;

                    case 0x00EE:
                    chip8.INSTRUCTINFO[1] = "RET";
                    chip8.INSTRUCTINFO[2] = "Return from a subroutine.";
                        chip8.PC = chip8.STACK[chip8.SP];
                        chip8.SP--;
                        break;
                }
                break;

            case 0x1000:
            chip8.INSTRUCTINFO[1] = "JP";
            chip8.INSTRUCTINFO[2] = "Jump to location.";
                chip8.PC = opcode & 0x0FFF;
                break;

            case 0x2000:
            chip8.INSTRUCTINFO[1] = "CALL";
            chip8.INSTRUCTINFO[2] = "Call subroutine.";
                chip8.STACK[chip8.SP] = chip8.PC;
                chip8.SP++;
                chip8.PC = opcode & 0x0FFF;
                break;

            case 0x3000:
            chip8.INSTRUCTINFO[1] = "SE";
            chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = kk.";
                if (chip8.VREGISTER[x] == (opcode & 0x00FF)) {
                  chip8.PC += 2;
                }
                break;

            case 0x4000:
            chip8.INSTRUCTINFO[1] = "SNE";
            chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != kk.";
                if (chip8.VREGISTER[x] != (opcode & 0x00FF)) {
                    chip8.PC += 2;
                }
                break;

            case 0x5000:
            chip8.INSTRUCTINFO[1] = "SE";
            chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = Vy.";
                if (chip8.VREGISTER[x] == chip8.VREGISTER[y]) {
                    chip8.PC += 2;
                }
                break;

            case 0x6000:
            chip8.INSTRUCTINFO[1] = "LD";
            chip8.INSTRUCTINFO[2] = "Set Vx = kk.";
                chip8.VREGISTER[x] = (opcode & 0x00FF);
                break;

            case 0x7000:
            chip8.INSTRUCTINFO[1] = "ADD";
            chip8.INSTRUCTINFO[2] = "Set Vx = Vx + kk.";
                var sum =  chip8.VREGISTER[x] + (opcode & 0x00FF);

                if (sum > 255) {
                    sum -= 256;
                }

                chip8.VREGISTER[x] = sum;
                break;

            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vy.";
                        chip8.VREGISTER[x] = chip8.VREGISTER[y];
                        break;

                    case 0x0001:
                    chip8.INSTRUCTINFO[1] = "OR";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx OR Vy.";
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] | chip8.VREGISTER[y];
                        break;

                    case 0x0002:
                    chip8.INSTRUCTINFO[1] = "AND";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx AND Vy.";
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] & chip8.VREGISTER[y];
                        break;

                    case 0x0003:
                    chip8.INSTRUCTINFO[1] = "XOR";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx XOR Vy.";
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] ^ chip8.VREGISTER[y];
                        break;

                    case 0x0004:
                    chip8.INSTRUCTINFO[1] = "ADD";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx + Vy, set VF = carry.";
                        if ((chip8.VREGISTER[x] + chip8.VREGISTER[y]) > 255) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = (chip8.VREGISTER[x] + chip8.VREGISTER[y]) & 0x00FF;
                        break;

                    case 0x0005:
                    chip8.INSTRUCTINFO[1] = "SUB";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
                        if (chip8.VREGISTER[x] > chip8.VREGISTER[y]) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] - chip8.VREGISTER[y];
                        break;

                    case 0x0006:
                    chip8.INSTRUCTINFO[1] = "SHR";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHR Vy.";
                        chip8.VREGISTER[15] = (chip8.VREGISTER[x] & 0x0001);
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] >> 1;
                        break;

                    case 0x0007:
                    chip8.INSTRUCTINFO[1] = "SUBN";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
                        if (chip8.VREGISTER[x] < chip8.VREGISTER[y]) {
                            chip8.VREGISTER[15] = 1;
                        }
                        else {
                            chip8.VREGISTER[15] = 0;
                        }
                        chip8.VREGISTER[x] = chip8.VREGISTER[y] - chip8.VREGISTER[x];
                        break;

                    case 0x000E:
                    chip8.INSTRUCTINFO[1] = "SHL";
                    chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHL 1.";
                        chip8.VREGISTER[15] = chip8.VREGISTER[x] >> 7;
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] << 1;
                        break;
                }
                break;
            case 0x9000:
            chip8.INSTRUCTINFO[1] = "SNE";
            chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != Vy.";
                if (chip8.VREGISTER[x] != chip8.VREGISTER[y]) {
                  chip8.PC += 2;
                }
                break;
            case 0xA000:
            chip8.INSTRUCTINFO[1] = "LD";
            chip8.INSTRUCTINFO[2] = "Set I = nnn.";
                chip8.IREGISTER = (opcode & 0x0FFF);
                break;
            case 0xB000:
            chip8.INSTRUCTINFO[1] = "JP";
            chip8.INSTRUCTINFO[2] = "Jump to location nnn + V0.";
                chip8.PC = (opcode & 0x0FFF) + chip8.VREGISTER[0];
                break;
            case 0xC000:
            chip8.INSTRUCTINFO[1] = "RND";
            chip8.INSTRUCTINFO[2] = "Set Vx = random byte AND kk";
                chip8.VREGISTER[x] = ( (Math.floor((Math.random()*255))) & (opcode & 0x00FF) );
                break;
            case 0xD000:
            chip8.INSTRUCTINFO[1] = "DRW";
            chip8.INSTRUCTINFO[2] = "Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.";
                var N = (opcode & 0x000F); // The height of the sprite
                var startX = chip8.VREGISTER[x]; // The x coordinate of the sprite
                var startY = chip8.VREGISTER[y]; // The y coordinate of the sprite
                chip8.VREGISTER[0xF] = 0; // The VF register will act as a flag for if a pixel on the display is unset
                var pixel; // The value of a pixel, taken from memory

                for (var yCoord = 0; yCoord < N; yCoord++) { // There are N rows of length 8 pixels
                    pixel = chip8.MEMORY[chip8.IREGISTER + yCoord]; // The value of the current pixel is taken from memory
                    for (var xCoord = 0; xCoord < 8; xCoord++) {
                        if ((pixel & (0x80 >> xCoord)) != 0) { // If the current pixel is not empty
                            if (chip8.DISPLAY[ (startX+xCoord) + ((startY+yCoord) * 64) ] == 1) { // Check if the current pixel is already set or not
                                chip8.VREGISTER[0xF] = 1; // Unsetting a pixel will set the VF register
                            }
                            chip8.setPixel(startX+xCoord, startY+yCoord);
                        }
                    }
                }

                break;
            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E:
                    chip8.INSTRUCTINFO[1] = "SKP";
                    chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is pressed.";
                        if (chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
                            chip8.PC += 2;
                        }
                        break;
                    case 0x00A1:
                    chip8.INSTRUCTINFO[1] = "SKNP";
                    chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is not pressed.";
                        if (!chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
                            chip8.PC += 2;
                        }
                        break;
                }
                break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Set Vx = delay timer value.";
                        chip8.VREGISTER[x] = chip8.DELAYTIMER;
                        break;
                    case 0x000A:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Wait for a key press, store the value of the key in Vx.";
                    // NOT COMPLETED YET
                        break;
                    case 0x0015:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Set delay timer = Vx.";
                        chip8.DELAYTIMER = chip8.VREGISTER[x];
                        break;
                    case 0x0018:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Set sound timer = Vx.";
                        chip8.SOUNDTIMER = chip8.VREGISTER[x];
                        break;
                    case 0x001E:
                    chip8.INSTRUCTINFO[1] = "ADD";
                    chip8.INSTRUCTINFO[2] = "Set I = I + Vx.";
                        chip8.IREGISTER += chip8.VREGISTER[x];
                        break;
                    case 0x0029:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Set I = location of sprite for digit Vx.";
                        chip8.IREGISTER = chip8.VREGISTER[x]*5; // Font sprites have a width of 5
                        break;
                    case 0x0033:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Store BCD representation of Vx in memory locations I, I+1, and I+2.";
                        var number = chip8.VREGISTER[x];

                        chip8.MEMORY[chip8.IREGISTER+2] = parseInt(number % 10);
                        chip8.MEMORY[chip8.IREGISTER+1] = parseInt((number/10) % 10);
                        chip8.MEMORY[chip8.IREGISTER] = parseInt((number/100) % 10);

                        break;
                    case 0x0055:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Store registers V0 through Vx in memory starting at location I.";
                        for (var i = 0; i <= x; i++) {
                            chip8.MEMORY[chip8.IREGISTER + i] = chip8.VREGISTER[i];
                        }
                        break;
                    case 0x0065:
                    chip8.INSTRUCTINFO[1] = "LD";
                    chip8.INSTRUCTINFO[2] = "Read registers V0 through Vx from memory starting at location I.";
                        for (var i = 0; i <= x; i++) {
                            chip8.VREGISTER[i] = chip8.MEMORY[chip8.IREGISTER + i];
                        }
                        break;
                }
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    },

    updateVisualizer() {
        document.getElementById("0regLabel").innerHTML = chip8.VREGISTER[0x0];
        document.getElementById("1regLabel").innerHTML = chip8.VREGISTER[0x1];
        document.getElementById("2regLabel").innerHTML = chip8.VREGISTER[0x2];
        document.getElementById("3regLabel").innerHTML = chip8.VREGISTER[0x3];
        document.getElementById("4regLabel").innerHTML = chip8.VREGISTER[0x4];
        document.getElementById("5regLabel").innerHTML = chip8.VREGISTER[0x5];
        document.getElementById("6regLabel").innerHTML = chip8.VREGISTER[0x6];
        document.getElementById("7regLabel").innerHTML = chip8.VREGISTER[0x7];
        document.getElementById("8regLabel").innerHTML = chip8.VREGISTER[0x8];
        document.getElementById("9regLabel").innerHTML = chip8.VREGISTER[0x9];
        document.getElementById("AregLabel").innerHTML = chip8.VREGISTER[0xA];
        document.getElementById("BregLabel").innerHTML = chip8.VREGISTER[0xB];
        document.getElementById("CregLabel").innerHTML = chip8.VREGISTER[0xC];
        document.getElementById("DregLabel").innerHTML = chip8.VREGISTER[0xD];
        document.getElementById("EregLabel").innerHTML = chip8.VREGISTER[0xE];
        document.getElementById("FregLabel").innerHTML = chip8.VREGISTER[0xF];
        document.getElementById("IregLabel").innerHTML = chip8.IREGISTER;

        document.getElementById("OpcodeLabel").innerHTML = chip8.INSTRUCTINFO[0];
        document.getElementById("NameLabel").innerHTML = chip8.INSTRUCTINFO[1];
        document.getElementById("DescLabel").innerHTML = chip8.INSTRUCTINFO[2];

        document.getElementById("DisTLabel").innerHTML = chip8.DELAYTIMER;
        document.getElementById("SouTLabel").innerHTML = chip8.SOUNDTIMER;

        document.getElementById("MemoryTextarea").innerHTML = "Start of CHIP 8 RAM reserved for interpreter (0 to 511)\n\n" + chip8.MEMORY.slice(0, 511)
                                                            + "\n\nStart of CHIP 8 Programs (512 to 1535)\n\n" + chip8.MEMORY.slice(512, 1535)
                                                            + "\n\nCHIP 8 Program / Data space (1536 to 4095)\n\n" + chip8.MEMORY.slice(1536, 4095);

        document.getElementById("PCLabel").innerHTML = chip8.PC;

        document.getElementById("Stack0Label").innerHTML = chip8.STACK[0x0];
        document.getElementById("Stack1Label").innerHTML = chip8.STACK[0x1];
        document.getElementById("Stack2Label").innerHTML = chip8.STACK[0x2];
        document.getElementById("Stack3Label").innerHTML = chip8.STACK[0x3];
        document.getElementById("Stack4Label").innerHTML = chip8.STACK[0x4];
        document.getElementById("Stack5Label").innerHTML = chip8.STACK[0x5];
        document.getElementById("Stack6Label").innerHTML = chip8.STACK[0x6];
        document.getElementById("Stack7Label").innerHTML = chip8.STACK[0x7];
        document.getElementById("Stack8Label").innerHTML = chip8.STACK[0x8];
        document.getElementById("Stack9Label").innerHTML = chip8.STACK[0x9];
        document.getElementById("StackALabel").innerHTML = chip8.STACK[0xA];
        document.getElementById("StackBLabel").innerHTML = chip8.STACK[0xB];
        document.getElementById("StackCLabel").innerHTML = chip8.STACK[0xC];
        document.getElementById("StackDLabel").innerHTML = chip8.STACK[0xD];
        document.getElementById("StackELabel").innerHTML = chip8.STACK[0xE];
        document.getElementById("StackFLabel").innerHTML = chip8.STACK[0xF];
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

            CYCLES: chip8.CYCLES, // The number of cycles to run at a time per loop
            PAUSE: chip8.PAUSE, // Whether or not the emulator cycles are paused

        }
    },

    // prints out all fields of a state object
    statePrint(state){
        var printout = "REGISTERS\n---------\n";
        for(var i = 0; i<16; i++){
            printout += "reg" + i + ": " + state.VREGISTER[i].toString(16) +"\n";
        }
        printout += "ireg: " + state.IREGISTER.toString(16) + "\n";
        printout += "TIMERS\n----------\n";
        printout += "delay timer: " + state.DELAYTIMER.toString(16)  + "\n";
        printout += "sound timer: " + state.SOUNDTIMER.toString(16) + "\n";
        printout += "STACK\n----------\n";
        printout += "SP: "+state.SP.toString(16)+"\n 0 -> [";
        for(var i = 0; i < 16; i++){
            printout += state.STACK[i].toString(16) + ".";
        }
        printout += "] <-16\n";
        printout += "MEMORY\n----------\n";
        printout += "PC: "+ state.PC.toString(16) + "\n";
        for(var i = 0; i < 128; i++){
            printout += (i * 32)+"-> [";
            for(var j = 0; j < 32; j++){
                printout += state.MEMORY[32*i + j].toString(16) + ".";
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
