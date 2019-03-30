var data = new Array(8*5);
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

    var combinedData = data.join('');
    document.getElementById("hexArea").innerHTML = parseInt(combinedData, 2).toString(16);
}
