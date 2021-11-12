const notesbtn = document.querySelector(".btn-notes");
const lettersbtn = document.querySelector(".btn-letters");
const screenbtn = document.querySelector(".fullscreen");
const piano = document.querySelector(".piano")
const auidos = document.querySelector(".audio-part")
//all the listeners
screenbtn.addEventListener("click", screenHandler);
notesbtn.addEventListener("click", changeToNotes);
lettersbtn.addEventListener("click", changeToLetters);
window.addEventListener("keydown", event => {
    event.preventDefault();
    if(!event.repeat){
        let codde = event.code.replace("Key","")
        const pianoKey = document.querySelector(`div[data-letter=${codde}]`)
        if(pianoKey){
            pianoKey.classList.add("piano-key-active")
        }    
        receivePressedkey(event.code)
    }   
})
document.addEventListener("keyup", event => {
    event.preventDefault(); 
    let codde = event.code.replace("Key", "")
    const pianoKey = document.querySelector(`div[data-letter=${codde}]`)  
    if(pianoKey){
        pianoKey.classList.remove("piano-key-active")
    }    
})
piano.onmousedown  = function(ev){ 
    withPressedMouse()  
    ev.target.classList.add("piano-key-active");
    ev.target.classList.add("piano-key-active-pseudo");    
    let key = ev.target.getAttribute("data-letter")
    let keycode = "Key" + key    
    receivePressedkey(keycode)    
}
onmouseup  = function(ev){
    ev.target.classList.remove("piano-key-active");
    ev.target.classList.remove("piano-key-active-pseudo");
    unpressedMouseHandler()
}
piano.onmouseout  = function(ev){
    ev.target.classList.remove("piano-key-active");
}
//fullscreen part
function screenHandler(){
    if(screenbtn.classList.contains("openfullscreen")){
        openFullScreen()
    }
    else {
        closeFullScreen()
    }
}
//switch between letters and notes
function changeToNotes(ev){
    lettersbtn.classList.remove("btn-active");
    let btn = ev.target;    
    btn.classList.add("btn-active")
    let keys = piano.querySelectorAll(".piano-key")
    keys.forEach(element => {
        element.classList.remove("piano-key-letter")
    });
}
function changeToLetters(ev){
    notesbtn.classList.remove("btn-active");
    let btn = ev.target;    
    btn.classList.add("btn-active")
    let keys = piano.querySelectorAll(".piano-key")
    keys.forEach(element => {
        element.classList.add("piano-key-letter")
    });
}
// all keys functions
function receivePressedkey(code){    
    let audiolib = auidos.querySelectorAll("audio")
    audiolib.forEach(elem=> {
        if(elem.getAttribute("data-key") === code){
            elem.play()
            elem.currentTime = 0
        }
    })
}
function withPressedMouse(){
    piano.querySelectorAll(".piano-key").forEach(key=>{        
        key.addEventListener("mouseover", pressedMouseHandler)
    })
}
function pressedMouseHandler(ev){    
     ev.target.classList.add("piano-key-active")
     let keycode = "Key" + ev.target.getAttribute("data-letter")
     receivePressedkey(keycode)     
}
function unpressedMouseHandler(){       
    piano.querySelectorAll(".piano-key").forEach(key=>{        
        key.removeEventListener("mouseover", pressedMouseHandler)
    })
}
function openFullScreen(){
    document.documentElement.requestFullscreen()
    screenbtn.classList.remove("openfullscreen")
}
function closeFullScreen(){
    document.exitFullscreen
    screenbtn.classList.add("openfullscreen")
}