var testrun = function(){
    chip8.reset();
    console.log("TESTING START");

    // Test 00E0
    var flag = 0;
    chip8.DISPLAY = chip8.DISPLAY.map(()=>1);
    chip8.execute(0x00E0);
    chip8.updateDisplay();
    for (i = 0; i < chip8.DISPLAY.length; i++) {
        if (chip8.DISPLAY[i] != 0) {
            flag = 1;
            break;
        }
    }
    if (flag) { console.log("test 00E0 FAIL") } else { console.log("test 00E0 pass") }

    // Test 00EE
    flag = 0;
    chip8.reset();
    chip8.SP++;
    chip8.STACK[1] = 123;
    chip8.execute(0x00EE);
    if (chip8.SP != 0) flag = 1;
    if (chip8.PC != 123) flag = 1;
    if (flag) { console.log("test 00EE FAIL") } else { console.log("test 00EE pass") }

    // Test 1nnn
    flag = 0;
    chip8.reset();
    chip8.execute(0x1123);
    if (chip8.PC != 0x123) flag = 1;
    if (flag) { console.log("test 1nnn FAIL") } else { console.log("test 1nnn pass") }

    // Test 2nnn
    flag = 0;
    chip8.reset();
    chip8.PC = 123;
    chip8.execute(0x2123);
    if (chip8.SP != 1) flag = 1;
    if (chip8.STACK[0] != 123) flag = 1;
    if (chip8.PC != 0x123) flag = 1;
    if (flag) { console.log("test 2nnn FAIL") } else { console.log("test 2nnn pass") }

    // Test 3xkk
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0x0023;
    chip8.execute(0x3123);
    if (chip8.PC != 0x202) flag = 1;
    if (flag) { console.log("test 3xkk FAIL") } else { console.log("test 3xkk pass") }

    // Test 4xkk
    flag = 0;
    chip8.reset();
    chip8.execute(0x4123);
    if (chip8.PC != 0x202) flag = 1;
    if (flag) { console.log("test 4xkk FAIL") } else { console.log("test 4xkk pass") }

    // Test 5xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1234;
    chip8.VREGISTER[2] = 1234;
    chip8.execute(0x5120);
    if (chip8.PC != 0x202) flag = 1;
    if (flag) { console.log("test 5xy0 FAIL") } else { console.log("test 5xy0 pass") }

    // Test 6xkk
    flag = 0;
    chip8.reset();
    chip8.execute(0x6123);
    if (chip8.VREGISTER[1] != 0x23) flag = 1;
    if (flag) { console.log("test 6xkk FAIL") } else { console.log("test 6xkk pass") }

    // Test 7xkk
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0xFF;
    chip8.execute(0x71F1);
    if (chip8.VREGISTER[1] != 0xF0) flag = 1;
    if (flag) { console.log("test 7xkk FAIL") } else { console.log("test 7xkk pass") }

    // Test 8xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[2] = 0x12;
    chip8.execute(0x8120);
    if (chip8.VREGISTER[1] != 0x12) flag = 1;
    if (flag) { console.log("test 8xy0 FAIL") } else { console.log("test 8xy0 pass") }

    // Test 8xy1
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 34;
    chip8.execute(0x8121);
    if (chip8.VREGISTER[1] != 46) flag = 1;
    if (flag) { console.log("test 8xy1 FAIL") } else { console.log("test 8xy1 pass") }

    // Test 8xy2
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 13;
    chip8.execute(0x8122);
    if (chip8.VREGISTER[1] != 12) flag = 1;
    if (flag) { console.log("test 8xy2 FAIL") } else { console.log("test 8xy2 pass") }

    // Test 8xy3
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 23;
    chip8.execute(0x8123);
    if (chip8.VREGISTER[1] != 27) flag = 1;
    if (flag) { console.log("test 8xy3 FAIL") } else { console.log("test 8xy3 pass") }

    // Test 8xy4
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 255;
    chip8.VREGISTER[2] = 255;
    chip8.execute(0x8124);
    if (chip8.VREGISTER[1] != 254) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    if (flag) { console.log("test 8xy4 FAIL") } else { console.log("test 8xy4 pass") }

    // Test 8xy5
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 10;
    chip8.VREGISTER[2] = 20;
    chip8.VREGISTER[0xF] = 1;
    chip8.execute(0x8125);
    if (chip8.VREGISTER[1] != 246) flag = 1;
    if (chip8.VREGISTER[0xF] != 0) flag = 1;
    if (flag) { console.log("test 8xy5 FAIL") } else { console.log("test 8xy5 pass") }

    // Test 8xy6
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 13;
    chip8.execute(0x8116);
    if (chip8.VREGISTER[1] != 6) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    if (flag) { console.log("test 8xy6 FAIL") } else { console.log("test 8xy6 pass") }

    // Test 8xy7
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 20;
    chip8.VREGISTER[2] = 10;
    chip8.VREGISTER[0xF] = 1;
    chip8.execute(0x8127);
    if (chip8.VREGISTER[1] != 246) flag = 1;
    if (chip8.VREGISTER[0xF] != 0) flag = 1;
    if (flag) { console.log("test 8xy7 FAIL") } else { console.log("test 8xy7 pass") }

    // Test 8xyE
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 255;
    chip8.execute(0x811E);
    if (chip8.VREGISTER[1] != 254) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    if (flag) { console.log("test 8xyE FAIL") } else { console.log("test 8xyE pass") }

    // Test 9xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 123;
    chip8.VREGISTER[2] = 121;
    chip8.execute(0x9120);
    if (chip8.PC != 0x202) flag = 1;
    if (flag) { console.log("test 9xy0 FAIL") } else { console.log("test 9xy0 pass") }

    // Test Annn
    flag = 0;
    chip8.reset();
    chip8.execute(0xA123);
    if (chip8.IREGISTER != 0x123) flag = 1;
    if (flag) { console.log("test Annn FAIL") } else { console.log("test Annn pass") }

    // Test Bnnn
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[0] = 0x1;
    chip8.execute(0xB001);
    if (chip8.PC != 0x002) flag = 1;
    if (flag) { console.log("test Bnnn FAIL") } else { console.log("test Bnnn pass") }

    // Test Cxkk
    // This command must be tested manually

    // Test Dxyn
    // This command must be tested manually

    // Test Ex9E
    // UNFINISHED
    flag = 1;
    chip8.reset();
    if (flag) { console.log("test Ex9E FAIL") } else { console.log("test Ex9E pass") }

    // Test ExA1
    // UNFINISHED
    flag = 1;
    chip8.reset();
    if (flag) { console.log("test ExA1 FAIL") } else { console.log("test ExA1 pass") }

    // Test Fx07
    flag = 0;
    chip8.reset();
    chip8.DELAYTIMER = 1;
    chip8.execute(0xF107);
    if (chip8.VREGISTER[1] != 1) flag = 1;
    if (flag) { console.log("test Fx07 FAIL") } else { console.log("test Fx07 pass") }

    // Test Fx0A
    // UNFINISHED
    flag = 1;
    chip8.reset();
    if (flag) { console.log("test Fx0A FAIL") } else { console.log("test Fx0A pass") }

    // Test Fx15
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.execute(0xF115);
    if (chip8.DELAYTIMER != 1) flag = 1;
    if (flag) { console.log("test Fx15 FAIL") } else { console.log("test Fx15 pass") }

    // Test Fx18
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.execute(0xF118);
    if (chip8.SOUNDTIMER != 1) flag = 1;
    if (flag) { console.log("test Fx18 FAIL") } else { console.log("test Fx18 pass") }

    // Test Fx1E
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.IREGISTER = 1;
    chip8.execute(0xF11E);
    if (chip8.IREGISTER != 2) flag = 1;
    if (flag) { console.log("test Fx1E FAIL") } else { console.log("test Fx1E pass") }

    // Test Fx29
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0xF;
    chip8.execute(0xF129);
    if (chip8.IREGISTER != 0x4B) flag = 1;
    if (flag) { console.log("test Fx29 FAIL") } else { console.log("test Fx29 pass") }

    // Test Fx33
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 254;
    chip8.execute(0xF133);
    if (chip8.MEMORY[chip8.IREGISTER] != 2) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 1] != 5) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 2] != 4) flag = 1;
    if (flag) { console.log("test Fx33 FAIL") } else { console.log("test Fx33 pass") }

    // Test Fx55
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[0] = 1;
    chip8.VREGISTER[1] = 2;
    chip8.VREGISTER[2] = 3;
    chip8.VREGISTER[3] = 4;
    chip8.VREGISTER[4] = 5;
    chip8.execute(0xF455);
    if (chip8.MEMORY[chip8.IREGISTER] != 1) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 1] != 2) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 2] != 3) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 3] != 4) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 4] != 5) flag = 1;
    if (flag) { console.log("test Fx55 FAIL") } else { console.log("test Fx55 pass") }

    // Test Fx65
    flag = 0;
    chip8.reset();
    chip8.MEMORY[chip8.IREGISTER] = 1;
    chip8.MEMORY[chip8.IREGISTER + 1] = 2;
    chip8.MEMORY[chip8.IREGISTER + 2] = 3;
    chip8.MEMORY[chip8.IREGISTER + 3] = 4;
    chip8.MEMORY[chip8.IREGISTER + 4] = 5;
    chip8.execute(0xF465);
    if (chip8.VREGISTER[0] != 1) flag = 1;
    if (chip8.VREGISTER[1] != 2) flag = 1;
    if (chip8.VREGISTER[2] != 3) flag = 1;
    if (chip8.VREGISTER[3] != 4) flag = 1;
    if (chip8.VREGISTER[4] != 5) flag = 1;
    if (flag) { console.log("test Fx65 FAIL") } else { console.log("test Fx65 pass") }

}

testrun();
chip8.reset();
// var program = [0x61, 0x00, 0x62, 0x00, 0xA0, 0x00, 0xD1,0x25, 0x71, 0x04, 0x12, 0x06];
// chip8.loadProgram(program);
