const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing",
  GREETING_LIST = [
    "Hey there,",
    "How's it going,",
    "Another beautiful day,",
    "Keep on going,",
    "You can do anything,",
    "Keep it up,",
  ];

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value; // input태그에 입력하고 제출(Submit)한 내용 = input의 value값이 됨.
  paintGreeting(currentValue); // 제출된 value를 인자로 실행.
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN); // form(이름 입력칸)의 내용이 보이도록 class="showing" 추가
  form.addEventListener("submit", handleSubmit);
}

function genRandom() {
  const randomInt = Math.floor(Math.random() * GREETING_LIST.length);
  return randomInt;
}

function randomGreeting() {
  const int = genRandom();
  return GREETING_LIST[int];
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const greetingText = randomGreeting();
  greeting.innerText = `${greetingText} ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser); // User가 존재하는 경우
  }
}

function init() {
  loadName();
}

init();
