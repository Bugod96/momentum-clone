const popbutton = document.querySelector(".js-popbutton");
const popbox = document.querySelector(".popcatBox");
const popcat = document.querySelector(".js-popcat");

const BASEURI = popcat.baseURI.replace("/index.html", "/");

const CLOSEDPIC = `${BASEURI}sources/closed.webp`;
const OPENPIC = `${BASEURI}sources/open.webp`;

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
  if (popcat.src === OPENPIC) {
    popcat.src = CLOSEDPIC;
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
  console.dir(popcat);
  if (popcat.src === CLOSEDPIC) {
    popcat.src = OPENPIC;
    audio.play();
  } else {
    popcat.src = CLOSEDPIC;
  }
};

const initPopcat = () => {
  popbutton.addEventListener("click", onPopButtonClick);
  popcat.addEventListener("click", onCatClick);
};

initPopcat();
