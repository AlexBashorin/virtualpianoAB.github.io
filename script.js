const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const audio = document.querySelectorAll('audio');

//MOUSE
function mousePlay(event) {
  const note = event.target.dataset.note;
  const aud = new Audio(`assets/audio/${note}.mp3`);
  aud.currentTime = 0;
  event.repeat = false;
  aud.play();
  event.target.classList.add('piano-key-active', 'piano-key-pseudo');

}

function mouseActions () {
  pianoKeys.forEach((element) => {   
    element.addEventListener('mousedown', mousePlay);
    element.addEventListener('mouseover', mousePlay);
  });
}

function mouseStop() {
  pianoKeys.forEach((element) => {
    element.removeEventListener('mouseover', mousePlay);
  })
  piano.addEventListener('mouseout', (event) => {
    event.target.classList.remove('piano-key-active', 'piano-key-pseudo');
  });
}

piano.addEventListener('mousedown', mouseActions);
document.addEventListener('mouseup', mouseStop);



//KEYBOARD
function keyPlay (pressedKey, event) {
  if (event.repeat) return;
  if(typeof(pressedKey) == "string") {
      for(let i = 0; i<audio.length; i++) {
          if (audio[i].dataset.letter == pressedKey) {
            audio[i].currentTime = 0;
            audio[i].play();
          }
      for(let i = 0; i<pianoKeys.length; i++) {
          if (pianoKeys[i].dataset.letter == pressedKey) {
              pianoKeys[i].classList.add("piano-key-active")
          }
      }
  } 
}
}

function keyRemove (pressedKey) {
  if(typeof(pressedKey) == "string") {

      for(let i = 0; i<pianoKeys.length; i++) {

          if (pianoKeys[i].dataset.letter == pressedKey) {
              pianoKeys[i].classList.remove("piano-key-active")
          }
      }
  }
}

window.addEventListener("keydown", (event) => {
  keyPlay(event.code[event.code.length-1], event);
})

window.addEventListener("keyup", (event) => {
  keyRemove(event.code[event.code.length-1]);
})


//NOTES and LETTERS
const buttons = document.querySelector('.btn-container');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');

buttons.addEventListener('click', function(event) {
  if(event.target.classList.contains('btn-active') === true) return;
    notesBtn.classList.toggle('btn-active');
    lettersBtn.classList.toggle('btn-active');

    if(lettersBtn.classList.contains('btn-active')) {
      pianoKeys.forEach((element) => {
        element.classList.add('piano-key-letter');
      })
    }

    if(notesBtn.classList.contains('btn-active')) {
      pianoKeys.forEach((element) => {
      element.classList.remove('piano-key-letter');
    })
  }
})




