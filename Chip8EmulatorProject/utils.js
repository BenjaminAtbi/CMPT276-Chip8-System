
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

    getExecution(opcode){
        return new Execution(this.getInstruction(opcode));
    }

    getOpcode(opcode) {
        switch (opcode & 0xF000) { // Get the first digit of the opcode
            case 0x0000:
                switch (opcode) {
                    // 0nnn - SYS addr - THIS COMMAND IS NOT NECESSARY
                    case 0x00E0:
                        return CLS;
                    case 0x00EE:
                        return RET;
                }
                break;

            case 0x1000:
                return JP;

            case 0x2000:
                return CALL;

            case 0x3000:
                return SE_byte;

            case 0x4000:
                return SNE;


            case 0x5000:

                return SE_y;

            case 0x6000:
                return LD_byte;

            case 0x7000:

                return ADD;

            case 0x8000:
                switch (opcode & 0x000F) { // Get the last digit of the opcode, the second and third digits are variable
                    case 0x0000:
                        return LD_y;

                    case 0x0001:
                        return OR;

                    case 0x0002:
                        return AND_byte;

                    case 0x0003:
                        return XOR;

                    case 0x0004:
                        return AND_y;

                    case 0x0005:
                        return SUB;

                    case 0x0006:

                        return SHRA;

                    case 0x0007:
                        return SUBN;

                    case 0x000E:
                        return SHL;
                }
                break;
            case 0x9000:
                return SNE;
            case 0xA000:

                return LD;
            case 0xB000:
                return JP;
            case 0xC000:
                return RND;
            case 0xD000:

                return DRW;
            case 0xE000:
                switch (opcode & 0x00FF) {
                    case 0x009E:

                        return SKP;
                    case 0x00A1:

                        return SKNP;
                }
                break;
            case 0xF000:
                switch (opcode & 0x00FF) {
                    case 0x0007:

                        return LD_Vx_DT;
                    case 0x000A:
                        return LD_K;
                    case 0x0015:

                        return LD_DT_Vx;
                    case 0x0018:

                        return LD_ST;
                    case 0x001E:
                        return AND_I;
                    case 0x0029:
                        return LD_F;
                    case 0x0033:

                        return LD_B;
                    case 0x0055:

                        return LD_I_Vx;
                    case 0x0065:

                        return LD_Vx_I;
                }
                break;
            default:
                throw new Error("Invalid opcode: " + opcode.toString(16));
        }
    }

}

class Execution{
    constructor(instruction, /*which states are changed*/){
        this.instr = instruction;
    }
}
//********************************
//Oppcode functions
//********************************

// clear the display
function CLS(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "CLS";
    chip8.INSTRUCTINFO[2] = "Clear the display.";
    chip8.clearDisplay();
}

// return from a subroutine
function RET(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "RET";
    chip8.INSTRUCTINFO[2] = "Return from a subroutine.";
    chip8.PC = chip8.STACK[chip8.SP];
    chip8.SP--;
}

function JP(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "JP";
    chip8.INSTRUCTINFO[2] = "Jump to location.";
    chip8.PC = opcode & 0x0FFF;
}

function CALL(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "CALL";
    chip8.INSTRUCTINFO[2] = "Call subroutine.";
    chip8.SP++;
    chip8.STACK[chip8.SP] = chip8.PC;
    chip8.PC = opcode & 0x0FFF;
}

function SE_byte(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SE";
    chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = kk.";
    if (chip8.VREGISTER[x] == opcode & 0x00FF) {
        chip8.PC += 2;
    }
}

function SNE(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SNE";
    chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != kk.";
    if (chip8.VREGISTER[x] != opcode & 0x00FF) {
        chip8.PC += 2;
    }
}

function SE_y(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SE";
    chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx = Vy.";
    if (chip8.VREGISTER[x] == chip8.VREGISTER[y]) {
        chip8.PC += 2;
    }
}

function LD_byte(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set Vx = kk.";
    chip8.VREGISTER[x] = (opcode & 0x00FF);
}

function ADD(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "ADD";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx + kk.";
    chip8.VREGISTER[x] = chip8.VREGISTER[x] + (opcode & 0x00FF);
}

function LD_y(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vy.";
    chip8.VREGISTER[x] = chip8.VREGISTER[y];
}

function OR(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "OR";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx OR Vy.";
    chip8.VREGISTER[x] = chip8.VREGISTER[x] | chip8.VREGISTER[y];
}

function AND_byte(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "AND";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx AND Vy.";
    chip8.VREGISTER[x] = chip8.VREGISTER[x] & chip8.VREGISTER[y];
}

function XOR(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "XOR";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx XOR Vy.";
    chip8.VREGISTER[x] = chip8.VREGISTER[x] ^ chip8.VREGISTER[y];
}

function AND_y(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "ADD";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx + Vy, set VF = carry.";
    if ((chip8.VREGISTER[x] + chip8.VREGISTER[y]) > 255) {
        chip8.VREGISTER[15] = 1;
    }
    else {
        chip8.VREGISTER[15] = 0;
    }
    chip8.VREGISTER[x] = (chip8.VREGISTER[x] + chip8.VREGISTER[y]) & 0x00FF;

}

function SUB(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SUB";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
    if (chip8.VREGISTER[x] > chip8.VREGISTER[y]) {
        chip8.VREGISTER[15] = 1;
    }
    else {
        chip8.VREGISTER[15] = 0;
    }
    chip8.VREGISTER[x] = chip8.VREGISTER[x] - chip8.VREGISTER[y];
}

function SHRA(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SHR";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHR Vy.";
    if (chip8.VREGISTER[x] & 0x0001 == 1) {
        chip8.VREGISTER[15] = 1;
    }
    else {
        chip8.VREGISTER[15] = 0;
    }
    chip8.VREGISTER[x] = chip8.VREGISTER[x] >> 1;

}

function SUBN(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SUBN";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx - Vy, set VF = NOT borrow.";
    if (chip8.VREGISTER[x] < chip8.VREGISTER[y]) {
        chip8.VREGISTER[15] = 1;
    }
    else {
        chip8.VREGISTER[15] = 0;
    }
    chip8.VREGISTER[x] = chip8.VREGISTER[y] - chip8.VREGISTER[x];

}

function SHL(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SHL";
    chip8.INSTRUCTINFO[2] = "Set Vx = Vx SHL 1.";
    if ((chip8.VREGISTER[x] & 0x80) == 1) {
        chip8.VREGISTER[15] = 1;
    }
    else {
        chip8.VREGISTER[15] = 0;
    }
    chip8.VREGISTER[x] = chip8.VREGISTER[x] << 1;

}

function SNE(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SNE";
    chip8.INSTRUCTINFO[2] = "Skip next instruction if Vx != Vy.";
    if (chip8.VREGISTER[x] != chip8.VREGISTER[y]) {
        chip8.PC += 2;
    }
}

function LD(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set I = nnn.";
    chip8.IREGISTER = (opcode & 0x0FFF);
}

function JP(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "JP";
    chip8.INSTRUCTINFO[2] = "Jump to location nnn + V0.";
    chip8.PC = (opcode & 0x0FFF) + chip8.VREGISTER[0];

}

function RND(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "RND";
    chip8.INSTRUCTINFO[2] = "Set Vx = random byte AND kk";
    chip8.VREGISTER[x] = ((Math.floor((Math.random() * 255))) & (opcode & 0x00FF));

}

function DRW(chip8, opcode) {
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
                if (chip8.DISPLAY[(startX + xCoord) + ((startY + yCoord) * 64)] == 0) { // Check if the current pixel is already set or not
                    chip8.DISPLAY[(startX + xCoord) + ((startY + yCoord) * 64)] = 1; // Set the current pixel if it is unset
                } else {
                    chip8.DISPLAY[(startX + xCoord) + ((startY + yCoord) * 64)] = 0; // Unset the pixel if it is already set
                    chip8.VREGISTER[0xF] = 1; // Unsetting a pixel will set the VF register
                }
            }
        }
    }
}

function SKP(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SKP";
    chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is pressed.";
    if (chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
        chip8.PC += 2;
    }
}

function SKNP(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "SKNP";
    chip8.INSTRUCTINFO[2] = "Skip the next instruction if key with value of Vx is not pressed.";
    if (!chip8.KEYS.keystate[chip8.VREGISTER[x]]) {
        chip8.PC += 2;
    }
}

function LD_Vx_DT(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set Vx = delay timer value.";
    chip8.VREGISTER[x] = chip8.DELAYTIMER;
}

function LD_K(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Wait for a key press, store the value of the key in Vx.";
    // NOT COMPLETED YET

}

function LD_DT_Vx(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set delay timer = Vx.";
    chip8.DELAYTIMER = chip8.VREGISTER[x];
}

function LD_ST(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set sound timer = Vx.";
    chip8.SOUNDTIMER = chip8.VREGISTER[x];
}

function ADD_I(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "ADD";
    chip8.INSTRUCTINFO[2] = "Set I = I + Vx.";
    chip8.IREGISTER += chip8.VREGISTER[x];
}

function LD_F(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Set I = location of sprite for digit Vx.";
    chip8.IREGISTER = chip8.VREGISTER[x] * 5; // Character sprites have a width of 5

}

function LD_B(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Store BCD representation of Vx in memory locations I, I+1, and I+2.";
    var number = chip8.VREGISTER[x];

    chip8.MEMORY[chip8.IREGISTER + 2] = parseInt(number % 10);
    chip8.MEMORY[chip8.IREGISTER + 1] = parseInt((number / 10) % 10);
    chip8.MEMORY[chip8.IREGISTER] = parseInt((number / 100) % 10);

}

function LD_I_Vx(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Store registers V0 through Vx in memory starting at location I.";
    for (var i = 0; i <= x; i++) {
        chip8.MEMORY[chip8.IREGISTER + i] = chip8.VREGISTER[x];
    }
}

function LD_Vx_I(chip8, opcode) {
    chip8.INSTRUCTINFO[1] = "LD";
    chip8.INSTRUCTINFO[2] = "Read registers V0 through Vx from memory starting at location I.";
    for (var i = 0; i <= x; i++) {
        chip8.VREGISTER[i] = chip8.MEMORY[chip8.IREGISTER + i];
    }
}