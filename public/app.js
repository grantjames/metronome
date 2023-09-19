var metronome = new Metronome();
var bpm = document.getElementById('bpmIndicator');
bpm.textContent = metronome.bpm;

var playButton = document.getElementById('pauseplaylogo');
playButton.addEventListener('click', function() {
    metronome.startStop();
});

const decrease5 = document.getElementById('decrease5');
const decrease1 = document.getElementById('decrease1');
const increase1 = document.getElementById('increase1');
const increase5 = document.getElementById('increase5');
var bpmChangeButtons = document.getElementsByClassName('bpm-change');

decrease5.addEventListener('click', function() {
        metronome.bpm -= 5;
        bpm.textContent = metronome.bpm;
    }
);
decrease1.addEventListener('click', function() {
        metronome.bpm -= 1;
        bpm.textContent = metronome.bpm;
    });
increase1.addEventListener('click', function() {
        metronome.bpm += 1;
        bpm.textContent = metronome.bpm;
    });
increase5.addEventListener('click', function() {
        metronome.bpm += 5;
        bpm.textContent = metronome.bpm;
    });