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
    if (flag) { console.log("test 00E0 fail") } else { console.log("test 00E0 pass") }

    // Test 00EE
    flag = 0;
    chip8.reset();
    chip8.SP++;
    chip8.STACK[1] = 1234;
    chip8.execute(0x00EE);
    if (chip8.SP != 0) flag = 1;
    if (chip8.PC != 1234) flag = 1;
    if (flag) { console.log("test 00EE fail") } else { console.log("test 00EE pass") }

    // Test 1nnn
    flag = 0;
    chip8.reset();
    chip8.execute(0x1123);
    if (chip8.PC != 0x123) flag = 1;
    if (flag) { console.log("test 1nnn fail") } else { console.log("test 1nnn pass") }

    // Test 2nnn
    flag = 0;
    chip8.reset();
    chip8.PC = 1234;
    chip8.execute(0x2123);
    if (chip8.SP != 1) flag = 1;
    if (chip8.STACK[0] != 1234) flag = 1;
    if (chip8.PC != 0x123) flag = 1;
    if (flag) { console.log("test 2nnn fail") } else { console.log("test 2nnn pass") }

    // Test 3xkk
    flag = 0;
    chip8.reset();
    chip8.VREGISTER[0x1] = 0x23;
    chip8.execute(0x3123);
    if (chip8.PC != 0x200 + 0x2) flag = 1;
    if (flag) { console.log("test 3xkk fail") } else { console.log("test 3xkk pass") }

}

testrun();
