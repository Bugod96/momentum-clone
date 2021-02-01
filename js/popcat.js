const popbutton = document.querySelector(".js-popbutton");
const popbox = document.querySelector(".popcatBox");
const popcat = document.querySelector(".js-popcat");
const closedPic =
  "https://cdn140.picsart.com/344990482042211.png?type=webp&to=min&r=640";
const openPic =
  "https://cdn140.picsart.com/345048830031211.png?type=webp&to=min&r=640";

let audio;
let counter = 0;

const onPopButtonClick = () => {
  counter += 1;
  popbox.classList.toggle("popup");
  if (counter > 1) {
    popbox.classList.toggle("popdown");
  }
  if (popbutton.innerText === "POP") {
    popbutton.innerText = "See You Later!";
  } else {
    popbutton.innerText = "POP";
  }
  if (popcat.src === openPic) {
    popcat.src = closedPic;
    popcat.classList.toggle("reverse"); // bug fix
  }
  popbutton.classList.add("hidden");
  setTimeout(() => {
    popbutton.classList.remove("hidden");
  }, 3000);
};

const onCatClick = () => {
  audio = new Audio();
  audio.src = "sources/pop-sound.flac";
  popcat.classList.toggle("reverse");
  if (popcat.src === closedPic) {
    popcat.src = openPic;
    audio.play();
  } else {
    popcat.src = closedPic;
  }
};

const initPopcat = () => {
  popbutton.addEventListener("click", onPopButtonClick);
  popcat.addEventListener("click", onCatClick);
};

initPopcat();
