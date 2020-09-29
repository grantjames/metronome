var metronome = new Metronome();
var tempo = document.getElementById('tempo');
var beats = document.getElementById('beats-bar');
tempo.textContent = metronome.tempo;
beats.textContent = metronome.beats;

var playPauseIcon = document.getElementById('play-pause-icon');

var playButton = document.getElementById('play-button');
playButton.addEventListener('click', function() {
    metronome.startStop();

    if (metronome.isRunning) {
        playPauseIcon.className = 'pause';
    }
    else {
        playPauseIcon.className = 'play';
        metronome.totalBeats=0;
        metronome.bar=0;
    }

});

var tempoChangeButtons = document.getElementsByClassName('tempo-change');
for (var i = 0; i < tempoChangeButtons.length; i++) {
    tempoChangeButtons[i].addEventListener('click', function() {
        metronome.tempo += parseInt(this.dataset.change);
        tempo.textContent = metronome.tempo;
        metronome.totalBeats=0;
        metronome.bar=0;
    });
}

var beatChangeButtons = document.getElementsByClassName('beat-change');
for (var i = 0; i < beatChangeButtons.length; i++) {
    beatChangeButtons[i].addEventListener('click', function() {
        metronome.beats += parseInt(this.dataset.change);
        beats.textContent = metronome.beats;
        metronome.totalBeats=0;
        metronome.bar=0;
    });
}

var diff_radios = document.getElementsByName('selector');
for (var i = 0, length = diff_radios.length; i < length; i++) {
    diff_radios[i].addEventListener('click', function(){
        for (var i = 0, length = diff_radios.length; i < length; i++) {
            if(diff_radios[i].checked) {
                metronome.difficulty=diff_radios[i].value;
                metronome.totalBeats=0;
                metronome.bar=0;
                break;
            };
        };
 });
};

var radios = document.getElementsByName('mode');
for (var i = 0, length = radios.length; i < length; i++) {
    radios[i].addEventListener('click', function(){
        for (var i = 0, length = radios.length; i < length; i++) {
            if(radios[i].checked) {
                metronome.mode=radios[i].value;
                metronome.totalBeats=0;
                metronome.bar=0;
                break;
            };
        };
 });
};