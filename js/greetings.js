const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const addGreetingForm = document.querySelector(".js-addGreetingForm");
const addGreetingInput = addGreetingForm.querySelector("input");
const greetingsList = document.querySelector(".js-greetingsList");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";
const GREETINGS_LS = "greetings-list";
const DEFAULT_GREETING_LIST = [
  { text: "Hey there,", id: 1 },
  { text: "How's it going,", id: 2 },
  { text: "Another beautiful day,", id: 3 },
];

let greets = [];
let greetingsId = 0;

const onSubmitAddGreeting = (event) => {
  event.preventDefault();
  if (addGreetingInput.value === "") {
    return;
  }
  paintGreetingsSettings(addGreetingInput.value);
  const greetObj = {
    text: addGreetingInput.value, // input에 대입되어 submit받은 내용
    id: greetingsId,
  };
  greets.push(greetObj);
  addGreetingInput.value = ""; // clear 기능: submit을 하면 입력한 내용이 사라지도록
  saveGreetings();
};

const deleteGreeting = (event) => {
  const btn = event.target; // 자기 자신(버튼)
  const li = btn.parentNode; // 자신의 부모태그. <li>~</li> 선택.
  greetingsList.removeChild(li); // <ul class="js-greetingsList"></ul>의 자식태그 중 인자로 대입된 <li> 삭제.
  const cleanGreetings = greets.filter((greeting) => {
    return greeting.id !== parseInt(li.id); // greets 배열 내부의 모든 요소들에 대해 함수를 실행하여 true라고 반환되는 요소들만 반환
  });
  greets = cleanGreetings; // greets 배열의 값을 새롭게 생성된 배열로 대체.
  saveGreetings();
};

const saveGreetings = () => {
  localStorage.setItem(GREETINGS_LS, JSON.stringify(greets)); // local storage에는 문자열 형식만 저장 가능. 객체를 문자열로 변환해주는 기능.
};

const paintGreetingsSettings = (text) => {
  greetingsId += 1;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.addEventListener("click", deleteGreeting);
  const greetingSpan = document.createElement("span");
  greetingSpan.innerText = `${text} `; // 매개변수로 받은 text값을 대입.
  const li = document.createElement("li"); // html 코드 <li> element를 생성.
  li.appendChild(greetingSpan); // li 태그 내부에 자식 태그로써 span 태그 & button 태그 추가.
  li.appendChild(deleteBtn);
  li.id = greetingsId;
  greetingsList.appendChild(li); // 완성된 html 코드를 <ul class="js-greetingsList"></ul> 내부의 자식태그로써 추가.
};

const loadGreetingsSettings = () => {
  greets.forEach((currentValue) =>
    paintGreetingsSettings(currentValue.text.toString())
  );
  addGreetingForm.addEventListener("submit", onSubmitAddGreeting);
};

// -------------------------------------------
const onUsernameSubmit = (event) => {
  event.preventDefault();
  const currentValue = input.value; // input태그에 입력하고 제출(Submit)한 내용 = input의 value값이 됨.
  paintGreeting(currentValue); // 제출된 value를 인자로 실행.
  localStorage.setItem(USER_LS, currentValue);
};

const askForName = () => {
  form.classList.add(SHOWING_CN); // form(이름 입력칸)의 내용이 보이도록 class="showing" 추가
  form.addEventListener("submit", onUsernameSubmit);
};

const randomGreetingText = () => {
  const randomInt = Math.floor(Math.random() * greets.length);
  const selectedGreeting = greets[randomInt.toString()];
  return selectedGreeting.text;
};

const paintGreeting = (username) => {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const greetingText = randomGreetingText();
  greeting.innerText = `${greetingText} ${username}`;
};

const loadName = () => {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser); // currentUser 값이 존재하는 경우
  }
};

const loadGreetingList = () => {
  const currentList = localStorage.getItem(GREETINGS_LS);
  if (currentList === null || currentList === "[]") {
    localStorage.setItem(GREETINGS_LS, JSON.stringify(DEFAULT_GREETING_LIST));
    greets = DEFAULT_GREETING_LIST;
  } else {
    greets = JSON.parse(currentList);
    greets = greets.map((current) => {
      greetingsId += 1;
      current.id = greetingsId;
      return current;
    });
    greetingsId = 0;
    saveGreetings(greets);
  }
};

const initGreeting = () => {
  loadGreetingList();
  loadName();
  loadGreetingsSettings();
};

initGreeting();
