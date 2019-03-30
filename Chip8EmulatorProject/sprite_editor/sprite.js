var sprite = ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10", "test11", "test12", "test13", "test14", "test15"];

function setColor(pixel) {
    pixel.style.backgroundColor = "black";

    updateText();
    displayText();
}

function updateText() {
    sprite = ["updating the text box works"];
}

function displayText() {
    document.getElementById("SpriteInfoArea").innerHTML = "There should be 15 individual opcodes (maximum) for the sprite:\n\n" + sprite;
}