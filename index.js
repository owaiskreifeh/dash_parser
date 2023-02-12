// XML Parser for MPD manifest

class Node {
    constructor(type) {
        this.type = type;
        this.attr = [];
        this.children = [];
        this.rawString = '';

        this.poStart = null; // pointer start tag
        this.poEnd = null; // pointer end tag
        this.pcStart = null; // pointer start end tag
        this.pcEnd = null; // pointer end end tag
    }
}


const objOC = {
    "<"     : ">",
    "\""    : "\"",
    "["     : "]",
    "{"     : "}",
};

const objROC = {
    ">"     : "<",
    "\""    : "\"",
    "]"     : "[",
    "}"     : "{",
};

const OC = new Map(Object.entries(objOC));
const ROC = new Map(Object.entries(objROC));
const stkOpen = [];

function parseXML(stringXML = "") {

    if (!stringXML) {
        return null;
    }

    let objCurrent = null;
    // set current char pointer to 0 after <?xml version="1.0" encoding="utf-8"?>
    let charP = stringXML.indexOf("%>") + 2; 

    while (charP < stringXML.length) {
        const chr = stringXML[charP];

        // if char is opening add it to stack
        if (OC.has(chr)) {
            stkOpen.push(chr);
            charP++;
        } 

        // if it's close char check if it belongs to the last opening then pop it
        else if (ROC.has(chr) && ROC.get(chr) == OC.get(peek(stkOpen))) {
            stkOpen.pop();
            charP++;

        }
        
        // if char is white new line skip it
        else if (chr === '\t' || chr === '\r' || chr === '\n') {
            charP++;
        }


        
    }
    return objCurrent;
}


function peek(stack) {
    return stack[stack.length-1]
}