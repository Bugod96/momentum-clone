const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date(),
    minutes = date.getMinutes(),
    fullhour = date.getHours(),
    seconds = date.getSeconds();

  if (fullhour >= 13) {
    var hours = fullhour - 12, // const 혹은 let으로 변수 선언시 에러 발생. 원인 불명.
      day_night = "오후";
  } else if (fullhour == 0) {
    var hours = 12, // I made it show 오전 12:00 & 오후 12:00 instead of 0:00 AM & 0:00 PM. 개인 취향.
      day_night = "오전";
  } else {
    var hours = fullhour,
      day_night = "오전";
  }

  clockTitle.innerText = `${day_night} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000); // 1초마다 자동 반복실행
}
init();
