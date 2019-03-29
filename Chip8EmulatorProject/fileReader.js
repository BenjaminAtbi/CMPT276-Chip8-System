
// reads the file from the input type=file with id inputFile and stores the contents
//    in an array of ints
function fileReader(theEvent) {
  var theFile = theEvent.target.files[0]; // get the file
  var reader = new FileReader(); // create FileReader()

  reader.onload = function(anotherEvent) {
    var theText = reader.result; // get the file data from the reader
    document.getElementById("FileInputDisplay").innerText = theText; // sets text of "display" element to the result of file
    //console.log(theText);
    console.log(parseIt(theText));
    chip8.loadProgram(parseIt(theText));    // loads the file into memory
  }
  reader.readAsText(theFile); // option for output type and format (URL, string, etc.)
}

function parseIt(content) {
  var regex = /([A-Z]|[0-9]){1,2}/gi;
  var _2array = content.match(regex);
  var opcodes = new Array;

  for (i = 0; i < _2array.length; i++) {
    opcodes.push(parseInt(_2array[i], 16));
  }
  return opcodes;
}

//  ***DECPRECATED FUNCTION***
// takes a string and parses it into an array of integers (base 16)
//    in groups of 4 using a regular expression
/*
function parseIt(content) {
  var regex = /([A-Z]|[0-9]){1,4}/gi;   // letters A to Z or numbers 0 to 9 in groups of 4 case insensitive
  var _4array = content.match(regex);   // split string into groups of 4
  var opcodes = new Array;

  for (i = 0; i < _4array.length; i++) {
    opcodes.push(parseInt(_4array[i], 16));
  }
  return opcodes;

  //return content.match(regex);
}
*/

// event listener for whenever the file button changes
document.getElementById("inputFile").addEventListener("change", fileReader, false);
