# CMPT276-Chip8-System

CMPT 276
Spring 2019
Group11

Group Members:
- Nicholas Vasiu
- Ronit Chawla
- Rakim Zubair
- Benjamin Atbi
- Marko Miletic

# HOW TO RUN THE TESTS AND GAMES
- When index.html is opened in the Chip8EmulatorProject directory, tests are automatically run from test.js 
  - results are printed in the console of the browser 
  - there are tests for every opcode in our interpreter except for the ones that deal with key input (those tests have not been implemented, and as a result show up as "FAIL) 
  - different opcodes can also be inputted into test.js in order to test our emulator manually
  - if the test passes, the console displays the result along with the name of the opcode
- The display functions are tested automatically when the html file is opened; a sprite can be shown endlessly scrolling on the canvas display
- Although our interface is not final, the functionality of the visualizer can also be tested
  - the execution of the scrolling sprite program can be paused using the "Toggle Pause" button
  - can be stepped forward using "next", "previous" has not been implemented yet
  - the contents of the registers, stack, and memory can be seen as they update throughout the program
  - the instructions can also be seen as they are executed
  - our current cycle speed is set fairly high, so it is recommended to step through the program to get a good grasp on the functionality of our visualizer
- File input, while not complete, can be tested by pressing the "Choose File" button and uploading a .txt file
  - doesn't support .ch8 files yet
  - contents of the .txt file are displayed on the webpage
- The README files for both games contain links to a browser version of Octo which can be used to test them
- The "Game" dropdown menu on the website is currently just for show, it does not actually load any programs. This is a planned feature for next release, along with the user being able to upload and test their own CHIP-8 programs

**HOW TO TEST PROGRAM LOADING**
- on the website, press the "Choose File" button and pick choose "ProgramLoadTest.txt" found in the "Chip8EmulatorProject" directory
- a sprite will display on the canvas to show that the program has been loaded
