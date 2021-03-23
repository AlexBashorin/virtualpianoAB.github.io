const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const audio = document.querySelectorAll('audio[data-key]');

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
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}


window.addEventListener('keydown', function(event) {
  if(event.repeat) return
  const pianoKeys = document.querySelectorAll(`.piano-key[data-letter="${event.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if(event.code === audio.dataset.key) 
  if(!audio) return
  audio.currentTime = 0;
  audio.play();
  pianoKeys.classList.add('piano-key-active', 'piano-key-pseudo');
});

function ifKeydown(event) {
  if(event.type === 'keydown') {
    
  }
}


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

