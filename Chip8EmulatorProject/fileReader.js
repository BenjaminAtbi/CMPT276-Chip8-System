function loadFile(file) {
  var reader = new FileReader(); // create FileReader()
  reader.onload = function(anotherEvent) {
    var text = reader.result; // get the file data from the reader
    printProgram(text);
    preloadedScripts['external'] = new Script('external',text,'No description provided');
    chip8.loadProgram('external', parseFile(text));    // loads the file into memory
  }
  reader.readAsText(file); // option for output type and format (URL, string, etc.)
}


function loadBinary(file) {
  var reader = new FileReader();
  reader.onload = function(anotherEvent) {
    // creates an array of ints where each index is the decimal representation of each
    //  byte from the binary file
    var opcodes = Array.from(new Uint8Array(reader.result));

    printProgram(opcodes.join(" "));
    preloadedScripts['external'] = new Script('external',opcodes.join(" "),'No description provided');
    chip8.loadProgram('external', opcodes);
  }
  reader.readAsArrayBuffer(file);
}

//called by dropdown menu
function selectGame(e){
  loadProgramByName(e.target.value)
}


function loadProgramByName(name){
  if (name != "zoom" && name != "team" && name != "fighters" && name != "invaders" && name != "pong") {
    name = "zoom";
  }
  var text = preloadedScripts[name].code
  printProgram(text)
  chip8.loadProgram(name, parseFile(text));
}

//to be improved
function printProgram(text){
  document.getElementById("FileInputDisplay").innerText = text; // sets text of "display" element to the result of file
}

function parseFile(content) {
  var regex = /([A-Z]|[0-9]){1,2}/gi;
  var _2array = content.match(regex);
  var opcodes = new Array;

  for (i = 0; i < _2array.length; i++) {
    opcodes.push(parseInt(_2array[i], 16));
  }
  return opcodes;
}

// reads the file from the input type=file with id inputFile and stores the contents
//    in an array of ints
function fileInputReader(theEvent) {
  var theFile = theEvent.target.files[0]; // get the file

  if (theFile.type === "text/plain" ) {   // file is .txt
    loadFile(theFile);
  }
  else if (theFile.type === "") {   // file is .ch8 (or other obscure extension)
    loadBinary(theFile);
  }
  else {
    console.log("error: invalid file type!");
  }
}

// event listener for whenever the file button changes
document.getElementById("inputFile").addEventListener("change", fileInputReader, false);
document.getElementById("game_option").addEventListener("change",selectGame,false)

//create initial labels
chip8.createLog()

//game loaded on pageload
var defaultGame = 'zoom'

chip8.loadProgram(defaultGame, parseFile(preloadedScripts[defaultGame].code))
