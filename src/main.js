import { musicList } from "./musicList";
import {
  audio,
  playButton,
  prevButton,
  nextButton,
  progress,
  durationContent,
  currentDuration,
  progressContainer,
  volume,
  range,
  clickedArea,
  repeat,
} from "./dom";
import { LoadMusic, formattedTime} from "./utilities";
import "./style.css";



let currentIndex = 0;
let isPlaying = false;
LoadMusic(currentIndex);

function playAudio() {
  audio.play();
  playButton.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
}
export function pauseAudio() {
  audio.pause();
  playButton.classList.replace("fa-pause", "fa-play");
  isPlaying = false;
}

function handlePlayPause() {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
}

function prevClick() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = musicList.length - 1;
  }
  LoadMusic(currentIndex);
}
function nextClick() {
  currentIndex++;
  if (currentIndex > musicList.length - 1) {
    currentIndex = 0;
  }
  LoadMusic(currentIndex);
}

function getUpdatedTime() {
  currentDuration.textContent = formattedTime(audio.currentTime);
  let percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
}

function clickOnProgress(event) {
  let clickedArea = event.offsetX / progressContainer.clientWidth;
  let timePlayed = audio.duration * clickedArea;
  audio.currentTime = timePlayed;
}

function muteVolume() {
  volume.classList.replace("fa-volume-high", "fa-volume-xmark");
  audio.muted = true;
}

function unmuteVolume() {
  volume.classList.replace("fa-volume-xmark", "fa-volume-high");
  audio.muted = false;
}

function handleVolume() {
  if (audio.muted) {
    unmuteVolume();
  } else {
    muteVolume();
  }
}

function showInputRange() {
  range.classList.replace("unvisibleVolume", "visibleVolume");
}
function hideInputRange() {
  range.classList.replace("visibleVolume", "unvisibleVolume");
}

function changeVolume() {
  audio.volume = range.value / 100;
}

function enableRepeating() {
  repeat.classList.add("select");
  audio.loop = true;
}

export function disableRepeating() {
  repeat.classList.remove("select");
  audio.loop = false;
}

function handleRepeating() {
  if (audio.loop) {
    disableRepeating();
  } else {
    enableRepeating();
  }
}
repeat.addEventListener("click", handleRepeating);
playButton.addEventListener("click", handlePlayPause);
prevButton.addEventListener("click", prevClick);
nextButton.addEventListener("click", nextClick);
audio.addEventListener("timeupdate", getUpdatedTime);
progressContainer.addEventListener("click", clickOnProgress);
volume.addEventListener("click", handleVolume);
volume.addEventListener("mouseover", showInputRange);
clickedArea.addEventListener("click", hideInputRange);
range.addEventListener("change", changeVolume);
audio.addEventListener("ended", nextClick);
