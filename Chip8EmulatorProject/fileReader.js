function loadFile(file){
  var reader = new FileReader(); // create FileReader()
  reader.onload = function(anotherEvent) {
    var text = reader.result; // get the file data from the reader
    printProgram(text)
    preloadedScripts.set('external',text)
    chip8.loadProgram('external', parseFile(text));    // loads the file into memory
  }
  reader.readAsText(file); // option for output type and format (URL, string, etc.)
}

function selectGame(e){
  loadProgramByName(e.target.value)
}

function loadProgramByName(name){
  var text = preloadedScripts.get(name) 
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
  loadFile(theFile)
}


// event listener for whenever the file button changes
document.getElementById("inputFile").addEventListener("change", fileInputReader, false);
document.getElementById("game_option").addEventListener("change",selectGame,false)

var defaultGame = 'zoom'

chip8.loadProgram(defaultGame, parseFile(preloadedScripts.get(defaultGame)))


