var metronome = new Metronome();


var bpmDisplayValue = document.getElementById('bpmIndicator');
var volumeDisplayValue = document.getElementById('volumeIndicator');

bpmDisplayValue.textContent = metronome.bpm;
volumeDisplayValue.textContent = parseInt(metronome.volume * 100) + "%"

var playButton = document.getElementById('pauseplaylogo');
playButton.addEventListener('click', function() {
    metronome.startStop();
});

const decrease1 = document.getElementById('decrease1');
const increase1 = document.getElementById('increase1');
const bpmSlider = document.getElementById('bpmSlider');
const volumeSlider = document.getElementById('volumeSlider');



// Add an event listener to the slider for BPM changes
bpmSlider.addEventListener('input', () => {
    metronome.bpm = parseInt(bpmSlider.value);
    bpmDisplayValue.textContent = metronome.bpm;
});

// Add an event listener to the slider for volume changes
volumeSlider.addEventListener('input', () => {
    metronome.volume = parseFloat(volumeSlider.value);
    volumeDisplayValue.textContent = parseInt(metronome.volume * 100) + "%";
});

decrease1.addEventListener('click', function() {
        metronome.bpm -= 1;
        bpmDisplayValue.textContent = metronome.bpm;
    });
increase1.addEventListener('click', function() {
        metronome.bpm += 1;
        bpmDisplayValue.textContent = metronome.bpm;
    });
