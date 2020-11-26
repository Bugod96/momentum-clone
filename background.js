const body = document.querySelector("body");

const IMG_NUMBER = 8;

function paintImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum}.jpg`;
  image.classList.add("bgImage");
  // image.addEventListener("loadend", handleImgLoad) // API로 원격으로 하는 경우에 필요.
  body.appendChild(image); // body.prepend(image)로 뒤로 보내기?
}

function genRandom() {
  const number = Math.ceil(Math.random() * 8);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
