const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const controls = document.querySelectorAll('button');
const sliders = document.querySelectorAll('.player__slider');
console.log(sliders);

isChanging = false;

//function to start/stop playback after clicking anywhere on video or on play button
function togglePlayback() {
    video.paused ? video.play() : video.pause();
}

//function to update progress bar with playback
const handleProgress = e => progress.children[0].style.flex = e.target.currentTime / e.target.duration;

//function to update progress to position scrolled
function updateProgress(e) {
   if (!isChanging) return;
   video.currentTime = (e.layerX / video.videoWidth) * video.duration;
}

//function to update progress to position clicked
const clickProgress = (e) => video.currentTime = (e.layerX / video.videoWidth) * video.duration;

//function to control play and seek buttons
function controlButtons() {
    if (this === controls[0]) togglePlayback();
    if (this === controls[1]) video.currentTime = video.currentTime - 10;
    if (this === controls[2]) video.currentTime = video.currentTime + 25;
}

//function to handle slider bars
function handleInput(e) {
    if (this.name === 'volume') video.volume = this.value;
    if (this.name === 'playbackRate') video.playbackRate = this.value;
}

//EventListeners
video.addEventListener('click', togglePlayback);
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('mousemove', updateProgress)
progress.addEventListener('mousedown', () => isChanging = true);
progress.addEventListener('mouseup', () => isChanging = false);
progress.addEventListener('click', clickProgress);
controls.forEach(button => button.addEventListener('click', controlButtons));
sliders.forEach(slider => slider.addEventListener('input', handleInput));