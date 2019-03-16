
// Object to manage input states
// notes:
// * Constructor accepts name of a keymapping, defaults to "default"
// * Constructor adds event listeners to the document, and adds a reference to itself 
//   in the document so that the listeners can alter its state.

class keyInput {
    constructor(mapname = "default") {
        //is any key pressed
        this.keypressed = false;

        //Storage space for different keymappings
        this.savedmaps = {
            default: new Map([['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9],
            ['q', 10], ['w', 11], ['e', 12], ['r', 13], ['t', 14], ['y', 15]])
        };

        this.keymap = this.savedmaps[mapname];

        this.keystate = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];

        document.keyref = this;
        document.addEventListener('keydown', function (event) {
            if (this.keyref.keymap.has(event.key)) {
                this.keyref.keystate[this.keyref.keymap.get(event.key)] = true;
                this.keyref.keypressed = true;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (this.keyref.keymap.has(event.key)) {
                this.keyref.keystate[this.keyref.keymap.get(event.key)] = true;
                this.keyref.keypressed = true;
            }
        })

    }

    //check state value
    check(keynum) {
        return this.keystate[keynum];
    };

}

//*******************
// WORK IN PROGRESS
//*******************

//Acts as reference for opcode functions 
class OpcodeManager {

    constructor() {
        
    }

    getExecution(opcode) {
        return new Execution(this.getOpcode(opcode));
    }

    getOpcode(opcode) {
        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0: return new  CLS();
                    case 0x00EE: return new  RET();
                }
                break;
            case 0x1000: return new  JP();
            case 0x2000: return new  CALL();
            case 0x3000: return new  SE_byte();
            case 0x4000: return new  SNE_kk();
            case 0x5000: return new  SE_y();
            case 0x6000: return new  LD_byte();
            case 0x7000: return new  ADD();
            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000: return new  LD_y();
                    case 0x0001: return new  OR();
                    case 0x0002: return new  AND_byte();
                    case 0x0003: return new  XOR();
                    case 0x0004: return new  AND_y();
                    case 0x0005: return new  SUB();
                    case 0x0006: return new  SHR();
                    case 0x0007: return new  SUB_N();
                    case 0x000E: return new  SHL();
                }
                break;
            case 0x9000: return new  SNE_Vy();
            case 0xA000: return new  LD();
            case 0xB000: return new  JP();
            case 0xC000: return new  RND();
            case 0xD000: return new  DRW();
            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E: return new  SKP();
                    case 0x00A1: return new  SKNP();
                }
                break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007: return new  LD_Vx_DT();
                    case 0x000A: return new  LD_K();
                    case 0x0015: return new  LD_DT_Vx();
                    case 0x0018: return new  LD_ST();
                    case 0x001E: return new  AND_I();
                    case 0x0029: return new  LD_F();
                    case 0x0033: return new  LD_B();
                    case 0x0055: return new  LD_I_Vx();
                    case 0x0065: return new  LD_Vx_I();
                }
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    }
}

class Execution {
    constructor(instruction) {
        this.instr = instruction;
    }

    execute(chip8){
        this.beforestate = instr.SaveState(chip8);
        instr.execute;
        this.afterstate = instr.SaveState(chip8);
    }
}


//********************************
//Opcode functions
//********************************

// clear the display
//00E0
class CLS {
    execute(chip8, opcode) {
        chip8.clearDisplay();
    }

    SaveState(chip8, state) {

    }
}

// return from a subroutine
//00EE
class RET {
    execute(chip8, opcode) {
        chip8.PC = chip8.STACK[chip8.SP];
        chip8.SP--;
    }

    SaveState(chip8, state) {

    }
}

//Jump to location nnn
//1nnn
class JP {
    execute(chip8, opcode) {
        chip8.PC = opcode & 0x0FFF;
    }

    SaveState(chip8, state) {

    }
}

//Call subroutine
//2nnn
class CALL {
    execute(chip8, opcode) {
        chip8.STACK[chip8.SP] = chip8.PC;
        chip8.SP++;
        chip8.PC = opcode & 0x0FFF;
    }

    SaveState(chip8, state) {

    }
}

//Skip next instruction if Vx = kk
//3xkk
class SE_byte {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] == (opcode & 0x00FF)) {
            chip8.PC += 2;
          }
    }

    SaveState(chip8, state) {

    }
}

//Skip next instruction if Vx != kk
//4xkk
class SNE_kk {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] != (opcode & 0x00FF)) {
            chip8.PC += 2;
        }
    }

    SaveState(chip8, state) {

    }
}

//Skip next instruction if Vx = Vy
//5xy0
class SE_y {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] == chip8.VREGISTER[y]) {
            chip8.PC += 2;
        }
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = kk
//6xkk
class LD_byte {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = (opcode & 0x00FF);
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx + kk
//7xkk
class ADD {
    execute(chip8, opcode) {
        var sum =  chip8.VREGISTER[x] + (opcode & 0x00FF);

                if (sum > 255) {
                    sum -= 256;
                }

                chip8.VREGISTER[x] = sum;
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vy
//8xy0
class LD_y {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = chip8.VREGISTER[y];
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx OR Vy
//8xy1
class OR {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = chip8.VREGISTER[x] | chip8.VREGISTER[y];
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx AND Vy
//8xy2
class AND_byte {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = chip8.VREGISTER[x] & chip8.VREGISTER[y];
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx XOR Vy
//8xy3
class XOR {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = chip8.VREGISTER[x] ^ chip8.VREGISTER[y];
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx + Vy, set VF = carry
//8xy4
class AND_y {
    execute(chip8, opcode) {
        if ((chip8.VREGISTER[x] + chip8.VREGISTER[y]) > 255) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = (chip8.VREGISTER[x] + chip8.VREGISTER[y]) & 0x00FF;

    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx - Vy, set VF = NOT borrow
//8xy5
class SUB {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] > chip8.VREGISTER[y]) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = chip8.VREGISTER[x] - chip8.VREGISTER[y];
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx SHR Vy
//8xy6
class SHR {
    execute(chip8, opcode) {
        chip8.VREGISTER[15] = (chip8.VREGISTER[x] & 0x0001);
        chip8.VREGISTER[x] = chip8.VREGISTER[x] >> 1;
        
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = Vx - Vy, set VF = NOT borrow
//8xy7
class SUB_N {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] < chip8.VREGISTER[y]) {
            chip8.VREGISTER[15] = 1;
        }
        else {
            chip8.VREGISTER[15] = 0;
        }
        chip8.VREGISTER[x] = chip8.VREGISTER[y] - chip8.VREGISTER[x];
        
    }
    
    SaveState(chip8, state) {

    }
}

//Set Vx = Vx SHL 1
//8xyE
class SHL {
    execute(chip8, opcode) {
        chip8.VREGISTER[15] = chip8.VREGISTER[x] >> 7;
                        chip8.VREGISTER[x] = chip8.VREGISTER[x] << 1;
                        
    }

    SaveState(chip8, state) {

    }
}

//Skip next instruction if Vx != Vy
//9xy0
class SNE_Vy {
    execute(chip8, opcode) {
        if (chip8.VREGISTER[x] != chip8.VREGISTER[y]) {
            chip8.PC += 2;
        }
    }

    SaveState(chip8, state) {

    }
}

//Set I = nnn
//Annn
class LD {
    execute(chip8, opcode) {
        chip8.IREGISTER = (opcode & 0x0FFF);
    }

    SaveState(chip8, state) {

    }
}

//Jump to location nnn + V0
//Bnnn
class JP_V0 {
    execute(chip8, opcode) {
        chip8.PC = (opcode & 0x0FFF) + chip8.VREGISTER[0];

    }

    SaveState(chip8, state) {

    }
}


//Set Vx = random byte AND kk
//Cxkk
class RND {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = ((Math.floor((Math.random() * 255))) & (opcode & 0x00FF));

    }

    SaveState(chip8, state) {

    }
}

//Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision
//Dxyn
class DRW {
    execute(chip8, opcode) {
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
    }

    SaveState(chip8, state) {

    }
}

//Skip the next instruction if key with value of Vx is pressed
//Ex9E
class SKP {
    execute(chip8, opcode) {
        if (chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
            chip8.PC += 2;
        }
    }

    SaveState(chip8, state) {

    }
}

//Skip the next instruction if key with value of Vx is not pressed
//ExA1
class SKNP {
    execute(chip8, opcode) {
        if (!chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
            chip8.PC += 2;
        }
    }

    SaveState(chip8, state) {

    }
}

//Set Vx = delay timer value
//Fx07
class LD_Vx_DT {
    execute(chip8, opcode) {
        chip8.VREGISTER[x] = chip8.DELAYTIMER;
    }

    SaveState(chip8, state) {

    }
}

//Wait for a key press, store the value of the key in Vx
//Fx0A
class LD_K {
    execute(chip8, opcode) {
        // NOT COMPLETED YET

    }

    SaveState(chip8, state) {

    }
}

//Set delay timer = Vx
//Fx15
class LD_DT_Vx {
    execute(chip8, opcode) {
        chip8.DELAYTIMER = chip8.VREGISTER[x];
    }

    SaveState(chip8, state) {

    }
}

//Set sound timer = Vx
//Fx18
class LD_ST {
    execute(chip8, opcode) {
        chip8.SOUNDTIMER = chip8.VREGISTER[x];
    }

    SaveState(chip8, state) {

    }
}

//Set I = I + Vx
//Fx1E
class ADD_I {
    execute(chip8, opcode) {
        chip8.IREGISTER += chip8.VREGISTER[x];
    }

    SaveState(chip8, state) {

    }
}

//Set I = location of sprite for digit Vx
//Fx29
class LD_F {
    execute(chip8, opcode) {
        chip8.IREGISTER = chip8.VREGISTER[x] * 5; // Character sprites have a width of 5

    }

    SaveState(chip8, state) {

    }
}

//Store BCD representation of Vx in memory locations I, I+1, and I+2
//Fx33
class LD_B {
    execute(chip8, opcode) {
        var number = chip8.VREGISTER[x];
        chip8.MEMORY[chip8.IREGISTER + 2] = parseInt(number % 10);
        chip8.MEMORY[chip8.IREGISTER + 1] = parseInt((number / 10) % 10);
        chip8.MEMORY[chip8.IREGISTER] = parseInt((number / 100) % 10);

    }

    SaveState(chip8, state) {

    }
}

//Store registers V0 through Vx in memory starting at location I
//Fx55
class LD_I_Vx {
    execute(chip8, opcode) {
        for (var i = 0; i <= x; i++) {
            chip8.MEMORY[chip8.IREGISTER + i] = chip8.VREGISTER[i];
        }
    }

    SaveState(chip8, state) {

    }
}

//Read registers V0 through Vx from memory starting at location I
//Fx65
class LD_Vx_I {
    execute(chip8, opcode) {
        for (var i = 0; i <= x; i++) {
            chip8.VREGISTER[i] = chip8.MEMORY[chip8.IREGISTER + i];
        }
    }

    SaveState(chip8, state) {

    }
}