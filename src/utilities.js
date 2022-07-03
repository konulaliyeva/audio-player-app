import { musicList } from "./musicList";
import { title, artist, audio, image, progress, durationContent } from "./dom";
import { disableRepeating, pauseAudio } from "./main";


export function LoadMusic(index) {
    let currentMusic = musicList[index];
    title.textContent = currentMusic.title;
    artist.textContent = currentMusic.singer;
    image.src = currentMusic.image;
    audio.src = currentMusic.audio;
    pauseAudio();
    setTimeout(function() {
      durationContent.textContent = formattedTime(audio.duration);
    }, 100);
    progress.style.width = "0%";
    disableRepeating();
  }

  export function formattedTime(time) {
    let minutes = Math.trunc(time / 60).toString();
    let seconds = Math.trunc(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes} : ${seconds}`;
  }