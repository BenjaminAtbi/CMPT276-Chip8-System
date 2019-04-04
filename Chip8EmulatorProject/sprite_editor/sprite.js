var data = new Array(8*15);
data.fill(0);

function togglePixel(id) {
    var button = document.getElementById(id);
    if (button.style.getPropertyValue("background-color") == "black") {
        button.style.setProperty("background-color", "white");
        data[id] = 0;
    } else {
        button.style.setProperty("background-color", "black");
        data[id] = 1;
    }
    console.log(data);
    document.getElementById("dataArea").innerHTML = data;

    binaryToHexadecimal();
}

function binaryToHexadecimal() {
    var hexNum = "";
    var combinedData = data.join('');

    for (var i = 0; i < combinedData.length; i += 4) {
        var byte = combinedData.substr(i, 4);
        var hexByte = parseInt(byte, 2).toString(16);
        hexNum += hexByte;
    }

    var newHex = "";

    for (var i = 0; i < hexNum.length; i++) {
        if ((i+1) % 4 == 0) {
            newHex += hexNum[i] + " ";
        }

        else {
            newHex += hexNum[i];
        }
    }

    var prefData = "";
    for (var i = 0; i < hexNum.length; i++) {
        if ((i+1) % 2 == 0) {
            prefData += "0x" + hexNum[i - 1] + hexNum[i] + " ";
        }
    }

    document.getElementById("hexArea").innerHTML = newHex;
    document.getElementById("prefArea").innerHTML = prefData;
}
