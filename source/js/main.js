import {checkFirstPriority, checkSecondPriority} from './utils.js';
import {KEY_CODES, BTNS_VALUE} from './consts.js'

const OUTPUT_FIELD = document.querySelector(".result"); // поле вывода результата
const WRAPPER = document.querySelector(".wrapper"); // обертка
let outputResult = ""; // результат вычислений
OUTPUT_FIELD.textContent = outputResult; // вывод результата

// обработка нажатий клавиш
function handleKeys(evt) {
  // проверяем есть ли код нажатой клавиши в KEY_CODES
  if (KEY_CODES.hasOwnProperty(evt.code)) {
    switch (evt.code) {
      case KEY_CODES.Backspace:
        deleteSymbols(-1);
        break;
      case KEY_CODES.Escape:
        deleteSymbols(0);
        break;
      case KEY_CODES.Equal:
      case KEY_CODES.Enter:
      case KEY_CODES.NumpadEnter:
        renderCalc();
        break;
      default:
        addSymbols(evt.key);
    }
  }
};

// удаление символов
// если number = 0 => удаляем все
// если number = -1 => удаляем последний
function deleteSymbols(number) {
  outputResult = outputResult.slice(0, number);
  OUTPUT_FIELD.textContent = outputResult;
};

// добавление символов
function addSymbols(item) {
  outputResult += item;
  OUTPUT_FIELD.textContent = outputResult;
};

// вывод результатов
function renderCalc() {
  outputResult = calculation(outputResult);
  OUTPUT_FIELD.textContent = outputResult;
};

// обработка кликов мыши
function handleClick(evt) {
  let target = evt.target;
  let dataId = target.dataset.id;
  if (target.classList.contains("btn")) {
    switch (dataId) {
      case "btnBack":
        deleteSymbols(-1);
        break;
      case "btnReset":
        deleteSymbols(0);
        break;
      case "btnEqually":
        renderCalc();
        break;
      default:
        addSymbols(BTNS_VALUE[dataId]);
    }
  }
};

// вычисление результата
function calculation(x) {
  let firstMath = /(\d+)([/*])(\d+)/;
  let secondMath = /(\d+)([-+])(\d+)/;
  let c = x;
  while (c.search(firstMath) != -1) {
    c = checkFirstPriority(c);
  }
  while (c.search(secondMath) != -1) {
    c = checkSecondPriority(c);
  }
  return c;
};

window.addEventListener("keydown", handleKeys);
WRAPPER.addEventListener("click", handleClick);
