function fileReader(theEvent) {
  var theFile = theEvent.target.files[0]; // get the file
  var reader = new FileReader(); // create FileReader()

  reader.onload = function(anotherEvent) {
    var theText = reader.result; // get the file data from the reader
    document.getElementById("FileInputDisplay").innerText = theText; // sets text of "display" element to the result of file
    //console.log(theText);
  }
  reader.readAsText(theFile); // option for output
}

// event listener for whenever the file button changes
document.getElementById("inputFile").addEventListener("change", fileReader, false);
