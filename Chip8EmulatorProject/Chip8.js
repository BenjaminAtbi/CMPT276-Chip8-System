

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
    PAUSE: false, // Whether or not the emulator is externally paused
    HALT: false, // Whether execution is internally halted
     
    OPCODEMANAGER: new OpcodeManager(100), 
     // 100 = default length of the execution record

    PROGRAM_NAME: "default",
    // name of the program being run

    aframeID: null, //id of requested animation frame, if any

    VERBOSE: false,

    program: null, //stored 

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

        chip8.PAUSE = false
        chip8.HALT = false
        
        document.getElementById("PauseLabel").innerHTML = "Execution Unpaused";
    },

    // Load a given program into memory
    loadProgram(name, program) {
        window.cancelAnimationFrame(chip8.aframeID)
        chip8.PROGRAM_NAME = name
        chip8.reset();
        for (var i = 0; i < program.length; i++) {
            chip8.MEMORY[0x200 + i] = program[i];
            //chip8.MEMORY[0x200 + i*2 + 1] = program[i] & 0x00FF;
    }
    chip8.startExecution();
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

    startExecution() {
        chip8.aframeID = requestAnimationFrame(chip8.emulateCycles);
    },

    emulateCycles() {
        chip8.aframeID = null
        for(var i = 0; i < chip8.CYCLES & !chip8.PAUSE & !chip8.HALT; i++){
            chip8.nextCycle()
        }
        if(!chip8.PAUSE & !chip8.HALT){
            chip8.aframeID = requestAnimationFrame(chip8.emulateCycles);
        }
    },

    nextCycle() {
        chip8.executeNextOpcode();
        chip8.beep();
        chip8.updateTimers();
        chip8.updateDisplay();
        chip8.updateVisualizer();
    },

    // Run a CPU cycle
    executeNextOpcode() {
            var opcode = chip8.MEMORY[chip8.PC] << 8 | chip8.MEMORY[chip8.PC + 1]; // Decode command
            if (chip8.VERBOSE){
                console.log("Executing opcode: "+opcode.toString(16))
            }
            chip8.PC += 2;
            chip8.execute(opcode); // Execute command
    },

    // execute one instruction and save it in the record
    execute(opcode) {
        if(chip8.VERBOSE){
            console.log(instruction)
        }

        try {
            instruction = chip8.OPCODEMANAGER.getInstruction(opcode)
            instruction.execute(chip8)    
            chip8.OPCODEMANAGER.record.enqueue(instruction)
        } catch(err) {
            console.log(err.message, "opcode: "+ opcode.toString(16), "instruction: "+instruction)
        }
    },

    updateTimers() {
        if (chip8.DELAYTIMER > 0) chip8.DELAYTIMER--;
        if (chip8.SOUNDTIMER > 0) chip8.SOUNDTIMER--;
    },

    updateDisplay() {
        var pageDisplay = document.getElementById("emulator_screen");
        var c = pageDisplay.getContext('2d');

        c.clearRect(0,0,64*chip8.SCALE,32*chip8.SCALE);

        for (var x = 0; x < 64; x++) {
            for (var y = 0; y < 32; y++) {
                if (chip8.DISPLAY[y*64 + x] == 1) c.fillRect(x*chip8.SCALE,y*chip8.SCALE,chip8.SCALE,chip8.SCALE);
            }
        }

    },

    togglePause() {
         if(!chip8.PAUSE) {
                 chip8.PAUSE = true;
                document.getElementById("PauseLabel").innerHTML = "Execution Paused";
            } else {
                chip8.PAUSE = false;
                document.getElementById("PauseLabel").innerHTML = "Execution Unpaused";
                chip8.startExecution();
            }
    },
    
    cycleChange(cycle) {
         if (cycle.value == '1') {
            chip8.CYCLES = 1;
         }

         else if (cycle.value == '5') {
            chip8.CYCLES = 5;
         }

         else if (cycle.value == '10') {
            chip8.CYCLES = 10;
         }

         else if (cycle.value == '20') {
            chip8.CYCLES = 20;
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

        if (xCoord >= 64) { // If the set pixel is outside the bounds of the display it is reduced
            xCoord = xCoord % 64;
        } else if (xCoord < 0) {
            xCoord += 64;
        }

        if (yCoord >= 32) {
            yCoord = yCoord % 32;
        } else if (yCoord < 0) {
            yCoord += 32;
        }

        chip8.DISPLAY[xCoord + (yCoord*64)] ^= 1; // Xor the pixel to flip it from on to off or vice versa

    },

    updateVisualizer() {

        for (var i = 0; i <= 0xF; i++){
            document.getElementById(i.toString(16).toUpperCase() + "regLabel").innerHTML = chip8.VREGISTER[i];
            document.getElementById("Stack" + i.toString(16).toUpperCase() + "Label").innerHTML = chip8.STACK[i];
        }

        document.getElementById("IregLabel").innerHTML = chip8.IREGISTER;
        document.getElementById("DisTLabel").innerHTML = chip8.DELAYTIMER;
        document.getElementById("SouTLabel").innerHTML = chip8.SOUNDTIMER;

        // document.getElementById("MemoryTextarea").innerHTML = "Start of CHIP 8 RAM reserved for interpreter (0 to 511)\n\n" + chip8.MEMORY.slice(0, 511)
        //                                                     + "\n\nStart of CHIP 8 Programs (512 to 1535)\n\n" + chip8.MEMORY.slice(512, 1535)
        //                                                     + "\n\nCHIP 8 Program / Data space (1536 to 4095)\n\n" + chip8.MEMORY.slice(1536, 4095);

        document.getElementById("PCLabel").innerHTML = chip8.PC;
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
