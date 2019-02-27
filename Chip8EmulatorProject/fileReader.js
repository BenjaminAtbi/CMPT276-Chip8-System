
// reads the file from the input type=file with id inputFile and stores the contents
//    in
function fileReader(theEvent) {
  var theFile = theEvent.target.files[0]; // get the file
  var reader = new FileReader(); // create FileReader()

  reader.onload = function(anotherEvent) {
    var theText = reader.result; // get the file data from the reader
    document.getElementById("FileInputDisplay").innerText = theText; // sets text of "display" element to the result of file
    //console.log(theText);
    console.log(parseIt(theText));
  }
  reader.readAsText(theFile); // option for output
}

// takes a string and parses it into an array with groups of 4 using a regular expression
function parseIt(content) {
  var regex = /([A-Z]|[0-9]){1,4}/gi;
  return content.match(regex);
}

// event listener for whenever the file button changes
document.getElementById("inputFile").addEventListener("change", fileReader, false);
