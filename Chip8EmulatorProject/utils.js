
// Object to manage input states
// notes:
// * Constructor accepts name of a keymapping, defaults to "default"
// * Constructor adds event listeners to the document, and adds a reference to itself
//   in the document so that the listeners can alter its state.

class keyInput {
    constructor(mapname = "default") {
        //is any key pressed
        this.keyspressed = 0;
        this.lastKey
        //Storage space for different keymappings
        this.savedmaps = {
            default: new Map([['x',0],['1', 1], ['2', 2], ['3', 3], ['q', 4], ['w', 5], ['e', 6], ['a', 7], ['s', 8], ['d', 9],
            ['z', 10], ['c', 11], ['4', 12], ['r', 13], ['f', 14], ['v', 15]])
        };

        this.keymap = this.savedmaps[mapname];

        this.keystate = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];

        document.keyref = this;
        document.addEventListener('keydown', function (event) {
            var key = this.keyref.keymap.get(event.key)
            if (this.keyref.keystate[key] == false) {
                this.keyref.keystate[key] = true;
                this.keyref.lastKey = event.key
                this.keyref.keyspressed++
            }
        });
        document.addEventListener('keyup', function (event) {
            var key = this.keyref.keymap.get(event.key)
            if (this.keyref.keystate[key] == true) {
                this.keyref.keystate[key] = false;
                this.keyref.keyspressed--
            }
        })

    }

    //check state value
    check(keynum) {
        return this.keystate[keynum];
    };

}

//for our purposes, end is the most recent record, and front is the oldest
// * Structure automatically clears the earliest element if a new element is added while length is max
// * access elements directly using get(index). 0 indexed, with 0 being front (oldest) record
// * getFromEnd(index) is convenience function to access elements directly with 0 being end (newest) record
class RecordQueue{
    constructor(maxlength){
        this.list = []
        this.maxlength = maxlength
        this.front = 0
        this.end = 0
        this.length = 0
    }

    //add an element to the record
    enqueue(element){

        //make space for new element if list is full
        if(this.end == this.front & this.length > 1){
            this.dequeue()
        }

        this.list[this.end] = element

        //cyclical increment
        if(this.end == this.maxlength - 1){
            this.end = 0
        }else{
            this.end++
        }
        this.length++
    }

    dequeue(){
        if(this.length > 0){
            var element = this.list[this.front]

            //cyclical increment
            if(this.front == this.maxlength - 1){
                this.front = 0
            }else{
                this.front++
            }

            this.length--
            return element
        }
        return undefined
    }

    get(relativeindex){
        if(relativeindex >= this.length){
            throw new RangeError("index out of bounds. length:"+this.length+ " requested index: "+relativeindex)
        }
        return this.list[(this.front + relativeindex) % this.maxlength]
    }

    getFromEnd(relativeindex){
        if(relativeindex >= this.length){
            throw new RangeError("index out of bounds. length:"+this.length+ " requested index: "+relativeindex)
        }

        if(relativeindex < this.end){
            return this.list[this.end - 1 - relativeindex]
        } else {
            return this.list[this.maxlength - 1 - relativeindex - this.end]
        }
    }

}
