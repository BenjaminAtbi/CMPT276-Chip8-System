
// Object to manage input states
var keyInput = {
     
    keypressed: false,  //is any key pressed
    keymap: "default",  //current key mapping, must be initialized.

    keystate: new Map(), //maps keys to their state

    //Storage space for different keymappings
    savedmaps: { 
        default:['1','2','3','4','5','6','7','8','9','q','w','e','r','t','y'] //
    },
    
    //register event listener, prepare for key input
    initialize(keymap = "default") { 
        document.addEventListener('keydown', function(event){
            if(keyInput.keystate.has(event.key)){
                keyInput.keystate.set(event.key,true)
                keyInput.keypressed = true
            }
        })
        document.addEventListener('keyup', function(event){1
            if(keyInput.keystate.has(event.key)){
                keyInput.keystate.set(event.key,false)
                keyInput.keypressed = true
            }
        })
        keyInput.loadmap(keymap)
        keyInput.keypressed = 0
    },




    //load a specified keymapping
    loadmap(mapname = "default"){ 
        keymap = keyInput.savedmaps[mapname]
        keystate = new Map()
        for(var i = 0; i < keymap.length; i++){
            keyInput.keystate.set(keymap[i],false)
        }
    },
}