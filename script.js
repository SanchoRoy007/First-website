const allAudios = Array.from(document.querySelectorAll('audio'));
const shuffleBtn = document.getElementById('shuffleBtn');
const stopBtn = document.getElementById('stopBtn');
const timerInput = document.getElementById('timerInput');
const startTimerBtn = document.getElementById('startTimerBtn');
const songSelect = document.getElementById('songSelect');
const playBtn = document.getElementById('playBtn');

let currentAudioIndex = -1;
let isShuffling = false;
let stopTimer;

// Helper: Stop all audios
function stopAllAudio() {
  allAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

// Shuffle Play Logic
function playNextShuffledSong() {
  stopAllAudio();
  const availableIndexes = allAudios.map((_, i) => i).filter(i => i !== currentAudioIndex);
  const nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  currentAudioIndex = nextIndex;

  const nextAudio = allAudios[currentAudioIndex];
  nextAudio.play();

  nextAudio.onended = () => {
    if (isShuffling) playNextShuffledSong();
  };
}

// Shuffle Play Button
shuffleBtn.addEventListener('click', () => {
  isShuffling = true;
  clearTimeout(stopTimer);
  playNextShuffledSong();
});

// Stop Button
stopBtn.addEventListener('click', () => {
  isShuffling = false;
  clearTimeout(stopTimer);
  stopAllAudio();
  alert("⏹ Song stopped manually.");
});

// Find audio by src
function findAudioBySrc(srcName) {
  return allAudios.find(audio => audio.src.includes(srcName));
}

// Play Button for selected song
playBtn.addEventListener('click', () => {
  const selected = songSelect.value;
  if (!selected) {
    alert("Please select a song first.");
    return;
  }

  isShuffling = false;
  clearTimeout(stopTimer);
  stopAllAudio();

  const audioToPlay = findAudioBySrc(selected);
  if (audioToPlay) {
    audioToPlay.play();
  }
});

// Start Timer Button (in minutes)
startTimerBtn.addEventListener('click', () => {
  clearTimeout(stopTimer);
  const minutes = parseInt(timerInput.value);
  if (!isNaN(minutes) && minutes > 0) {
    stopTimer = setTimeout(() => {
      stopAllAudio();
      isShuffling = false;
      alert("⏹ Timer expired! Song stopped.");
    }, minutes * 60 * 1000); // Convert minutes to ms
  } else {
    alert("⛔ Please enter a valid number of minutes.");
  }
});
