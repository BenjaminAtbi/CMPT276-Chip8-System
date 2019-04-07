var updateLabel = function(labelName, flag) {

  if (flag) {
    document.getElementById(labelName).innerHTML = "Failed"
    document.getElementById(labelName).style.color = 'red'
  } else {
    document.getElementById(labelName).innerHTML = "Passed"
    document.getElementById(labelName).style.color = 'green'
  }

}

var testrun = function(){
    chip8.reset();

    // Test 00E0
    var flag = 0;
    chip8.DISPLAY = chip8.DISPLAY.map(()=>1);
    chip8.execute(0x00E0);
    for (i = 0; i < chip8.DISPLAY.length; i++) {
        if (chip8.DISPLAY[i] != 0) {
            flag = 1;
            break;
        }
    }
    updateLabel("test0", flag);

    // Test 00EE
    flag = 0;
    chip8.reset();
    chip8.SP++;
    chip8.STACK[1] = 123;
    chip8.execute(0x00EE);
    if (chip8.SP != 0) flag = 1;
    if (chip8.PC != 123) flag = 1;
    updateLabel("test1", flag);

    // Test 1nnn
    flag = 0;
    chip8.reset();
    chip8.execute(0x1123);
    if (chip8.PC != 0x123) flag = 1;
    updateLabel("test2", flag);

    // Test 2nnn
    flag = 0;
    chip8.reset();
    chip8.PC = 123;
    chip8.execute(0x2123);
    if (chip8.SP != 1) flag = 1;
    if (chip8.STACK[0] != 123) flag = 1;
    if (chip8.PC != 0x123) flag = 1;
    updateLabel("test3", flag);

    // Test 3xkk
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0x0023;
    chip8.execute(0x3123);
    if (chip8.PC != 0x202) flag = 1;
    updateLabel("test4", flag);

    // Test 4xkk
    flag = 0;
    chip8.reset();
    chip8.execute(0x4123);
    if (chip8.PC != 0x202) flag = 1;
    updateLabel("test5", flag);

    // Test 5xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1234;
    chip8.VREGISTER[2] = 1234;
    chip8.execute(0x5120);
    if (chip8.PC != 0x202) flag = 1;
    updateLabel("test6", flag);

    // Test 6xkk
    flag = 0;
    chip8.reset();
    chip8.execute(0x6123);
    if (chip8.VREGISTER[1] != 0x23) flag = 1;
    updateLabel("test7", flag);

    // Test 7xkk
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0xFF;
    chip8.execute(0x71F1);
    if (chip8.VREGISTER[1] != 0xF0) flag = 1;
    updateLabel("test8", flag);

    // Test 8xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[2] = 0x12;
    chip8.execute(0x8120);
    if (chip8.VREGISTER[1] != 0x12) flag = 1;
    updateLabel("test9", flag);

    // Test 8xy1
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 34;
    chip8.execute(0x8121);
    if (chip8.VREGISTER[1] != 46) flag = 1;
    updateLabel("test10", flag);

    // Test 8xy2
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 13;
    chip8.execute(0x8122);
    if (chip8.VREGISTER[1] != 12) flag = 1;
    updateLabel("test11", flag);

    // Test 8xy3
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 12;
    chip8.VREGISTER[2] = 23;
    chip8.execute(0x8123);
    if (chip8.VREGISTER[1] != 27) flag = 1;
    updateLabel("test12", flag);

    // Test 8xy4
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 255;
    chip8.VREGISTER[2] = 255;
    chip8.execute(0x8124);
    if (chip8.VREGISTER[1] != 254) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    updateLabel("test13", flag);

    // Test 8xy5
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 10;
    chip8.VREGISTER[2] = 20;
    chip8.VREGISTER[0xF] = 1;
    chip8.execute(0x8125);
    if (chip8.VREGISTER[1] != 246) flag = 1;
    if (chip8.VREGISTER[0xF] != 0) flag = 1;
    updateLabel("test14", flag);

    // Test 8xy6
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 13;
    chip8.execute(0x8116);
    if (chip8.VREGISTER[1] != 6) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    updateLabel("test15", flag);

    // Test 8xy7
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 20;
    chip8.VREGISTER[2] = 10;
    chip8.VREGISTER[0xF] = 1;
    chip8.execute(0x8127);
    if (chip8.VREGISTER[1] != 246) flag = 1;
    if (chip8.VREGISTER[0xF] != 0) flag = 1;
    updateLabel("test16", flag);

    // Test 8xyE
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 255;
    chip8.execute(0x811E);
    if (chip8.VREGISTER[1] != 254) flag = 1;
    if (chip8.VREGISTER[0xF] != 1) flag = 1;
    updateLabel("test17", flag);

    // Test 9xy0
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 123;
    chip8.VREGISTER[2] = 121;
    chip8.execute(0x9120);
    if (chip8.PC != 0x202) flag = 1;
    updateLabel("test18", flag);

    // Test Annn
    flag = 0;
    chip8.reset();
    chip8.execute(0xA123);
    if (chip8.IREGISTER != 0x123) flag = 1;
    updateLabel("test19", flag);

    // Test Bnnn
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[0] = 0x1;
    chip8.execute(0xB001);
    if (chip8.PC != 0x002) flag = 1;
    updateLabel("test20", flag);

    // Test Cxkk
    // This command must be tested manually

    // Test Dxyn
    // This command must be tested manually

    // Test Ex9E
    // UNFINISHED
    flag = 1;
    chip8.reset();
    updateLabel("testEx9E", flag);

    // Test ExA1
    // UNFINISHED
    flag = 1;
    chip8.reset();
    updateLabel("testExA1", flag);

    // Test Fx07
    flag = 0;
    chip8.reset();
    chip8.DELAYTIMER = 1;
    chip8.execute(0xF107);
    if (chip8.VREGISTER[1] != 1) flag = 1;
    updateLabel("test21", flag);

    // Test Fx0A
    // UNFINISHED
    flag = 1;
    chip8.reset();
    updateLabel("testFx0A", flag);

    // Test Fx15
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.execute(0xF115);
    if (chip8.DELAYTIMER != 1) flag = 1;
    updateLabel("test22", flag);

    // Test Fx18
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.execute(0xF118);
    if (chip8.SOUNDTIMER != 1) flag = 1;
    updateLabel("test23", flag);

    // Test Fx1E
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 1;
    chip8.IREGISTER = 1;
    chip8.execute(0xF11E);
    if (chip8.IREGISTER != 2) flag = 1;
    updateLabel("test24", flag);

    // Test Fx29
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 0xF;
    chip8.execute(0xF129);
    if (chip8.IREGISTER != 0x4B) flag = 1;
    updateLabel("test25", flag);

    // Test Fx33
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[1] = 254;
    chip8.execute(0xF133);
    if (chip8.MEMORY[chip8.IREGISTER] != 2) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 1] != 5) flag = 1;
    if (chip8.MEMORY[chip8.IREGISTER + 2] != 4) flag = 1;
    updateLabel("test26", flag);

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
    updateLabel("test27", flag);

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
    updateLabel("test28", flag);

}

testrun();
chip8.reset();
// var program = [0x61, 0x00, 0x62, 0x00, 0xA0, 0x00, 0xD1,0x25, 0x71, 0x04, 0x12, 0x06];
// chip8.loadProgram(program);
