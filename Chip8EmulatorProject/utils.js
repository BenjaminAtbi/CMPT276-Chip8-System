
// Object to manage input states
// notes:
// * Constructor accepts name of a keymapping, defaults to "default"
// * Constructor adds event listeners to the document, and adds a reference to itself 
//   in the document so that the listeners can alter its state.

class keyInput {
    constructor(mapname = "default") {
        //is any key pressed
        this.keypressed = false; 
        
        //Storage space for different keymappings
        this.savedmaps = {
            default: new Map([['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9],
            ['q', 10], ['w', 11], ['e', 12], ['r', 13], ['t', 14], ['y', 15]])
        };

        this.keymap = this.savedmaps[mapname];

        this.keystate = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];
        
        document.keyref = this;
        document.addEventListener('keydown', function (event) {
            if (this.keyref.keymap.has(event.key)) {
                this.keyref.keystate[this.keyref.keymap.get(event.key)] = true;
                this.keyref.keypressed = true;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (this.keyref.keymap.has(event.key)) {
                this.keyref.keystate[this.keyref.keymap.get(event.key)] = true;
                this.keyref.keypressed = true;
            }
        }) 

    }
    //check state value
    check(keynum) {
        return this.keystate[keynum];
    };
    
}