
// Object to manage input states
var keyInput = {
     
    keypressed: false,  //is any key pressed
    keymap: savedmaps.default,  //current key mapping, should be initialized.

    keystate: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,],

    //Storage space for different keymappings
    savedmaps: { 
        default:[['1',1],['2',2],['3',3],['4',4],['5',5],['6',6],['7',7],['8',8],['9',9],
        ['q',0xA],['w',0xB],['e',0xC],['r',0xD],['t',0xE],['y',0xF]] 
    },
    
    //register event listener, prepare for key input
    initialize(keymap = "default") { 
        document.addEventListener('keydown', function(event){
            if(keyInput.keymap.has(event.key)){
                keyInput.keystate[keymay.get(event.key)] = true
                keyInput.keypressed = true
            }
        })
        document.addEventListener('keyup', function(event){1
            if(keyInput.keymap.has(event.key)){
                keyInput.keystate[keymay.get(event.key)] = false
                keyInput.keypressed = false
            }
        })
        keyInput.keymap = savedmaps[keymap]
    },

    //check state value
    check(keynum){
        return keystate[keynum]
    },
}