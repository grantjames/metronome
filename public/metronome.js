class Metronome
{
    constructor(bpm = 120)
    {
        this.audioContext = null;
        this.notesInQueue = [];         // notes that have been put into the web audio and may or may not have been played yet {note, time}
        this.currentBeatInBar = 0;
        this.beatsPerBar = 1; // simplify to bpm only for the time being
        this.bpm = bpm;
        this.lookahead = 25;          // How frequently to call scheduling function (in milliseconds)
        this.scheduleAheadTime = 0.1;   // How far ahead to schedule audio (sec)
        this.nextNoteTime = 0.0;     // when the next note is due
        this.isRunning = false;
        this.intervalID = null;

        this.image = document.getElementById('pauseplaylogo');
        this.imagePlayingSrc = 'img/Atomised Guitar Logo Playing.svg'; // Replace with your image source when playing
        this.imageStoppedSrc = 'img/Atomised Guitar Logo Paused.svg'; // Replace with your image source when stopped
        this.isImagePlaying = false;

    }

    nextNote()
    {
        // Advance current note and time by a quarter note (crotchet if you're posh)
        var secondsPerBeat = 60.0 / this.bpm; // Notice this picks up the CURRENT bpm value to calculate beat length.
        this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time
    
        this.currentBeatInBar++;    // Advance the beat number, wrap to zero
        if (this.currentBeatInBar == this.beatsPerBar) {
            this.currentBeatInBar = 0;
        }
    }

    scheduleNote(beatNumber, time)
    {
        // push the note on the queue, even if we're not playing.
        this.notesInQueue.push({ note: beatNumber, time: time });
    
        // create an oscillator
        const osc = this.audioContext.createOscillator();
        const envelope = this.audioContext.createGain();
        
        osc.frequency.value = (beatNumber % this.beatsPerBar == 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.audioContext.destination);
    
        osc.start(time);
        osc.stop(time + 0.03);
    }

    scheduler()
    {
        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
            this.scheduleNote(this.currentBeatInBar, this.nextNoteTime);
            this.nextNote();
        }
    }

    start()
    {
        if (this.isRunning) return;

        if (this.audioContext == null)
        {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.isRunning = true;

        this.currentBeatInBar = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;

        this.intervalID = setInterval(() => this.scheduler(), this.lookahead);

        // Change the image to the "playing" image
        this.changeImageToPlaying();
    }

    stop()
    {
        this.isRunning = false;

        clearInterval(this.intervalID);

        // Change the image to the "stopped" image
        this.changeImageToStopped();
    }

    startStop()
    {
        if (this.isRunning) {
            this.changeImageToStopped();
            this.stop();
        }
        else {
            this.changeImageToPlaying();
            this.start();
        }
    }

    // Method to change the image to the "playing" image
    changeImageToPlaying() {
        if (this.image) {
            this.image.src = this.imagePlayingSrc;
            this.isImagePlaying = true;
        }
    }

    // Method to change the image to the "stopped" image
    changeImageToStopped() {
        if (this.image) {
            this.image.src = this.imageStoppedSrc;
            this.isImagePlaying = false;
        }
    }
    
}