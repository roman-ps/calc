"use strict";

// коды клавиш
const KEY_CODES = {
  Digit0: "0",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Numpad0: "0",
  Numpad1: "1",
  Numpad2: "2",
  Numpad3: "3",
  Numpad4: "4",
  Numpad5: "5",
  Numpad6: "6",
  Numpad7: "7",
  Numpad8: "8",
  Numpad9: "9",
  Minus: "-",
  NumpadMultiply: "*",
  NumpadSubtract: "-",
  NumpadAdd: "+",
  NumpadDivide: "/",
  NumpadEnter: "NumpadEnter",
  Escape: "Escape",
  Backspace: "Backspace",
  Enter: "Enter",
  Equal: "Equal",
};

const BTNS_VALUE = {
  btn0: "0",
  btn1: "1",
  btn2: "2",
  btn3: "3",
  btn4: "4",
  btn5: "5",
  btn6: "6",
  btn7: "7",
  btn8: "8",
  btn9: "9",
  btnEqually: "=",
  btnPlus: "+",
  btnMinus: "-",
  btnMulti: "*",
  btnSplit: "/",
};

const OUTPUT_FIELD = document.querySelector(".result"); // поле вывода результата
const WRAPPER = document.querySelector(".wrapper"); // обертка
let outputResult = ""; // результат вычислений
OUTPUT_FIELD.textContent = outputResult; // вывод результата

// обработка нажатий клавиш
function handleKeys(evt) {
  if (KEY_CODES.hasOwnProperty(evt.code)) {
    // если код нажатой клавиши есть в KEY_CODES
    switch (evt.code) {
      case KEY_CODES.Backspace: // 8
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
        outputResult += evt.key;
        OUTPUT_FIELD.textContent = outputResult;
    }
  }
}

// удаляем символы, последний символ если x = -1
function deleteSymbols(x) {
  outputResult = outputResult.slice(0, x);
  OUTPUT_FIELD.textContent = outputResult;
}

// вывод результатов
function renderCalc() {
  outputResult = calculation(outputResult);
  OUTPUT_FIELD.textContent = outputResult;
}

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
        outputResult += BTNS_VALUE[dataId];
        OUTPUT_FIELD.textContent = outputResult;
    }
  }
}

// поиск знаков с высоким приоритетом
function checkFirstPriority(x) {
  let reg = /(\d+)([/*])(\d+)/;
  return x.replace(reg, function (match, g1, g2, g3) {
    return g2 == "*"
    ? g1 * g3
    : g1 / g3;
  });
}

// поиск знаков с низким приоритетом
function checkSecondPriority(x) {
  let reg = /(\d+)([-+])(\d+)/;
  return x.replace(reg, function (match, g1, g2, g3) {
    return g2 == "+"
      ? parseInt(g1) + parseInt(g3)
      : parseInt(g1) - parseInt(g3);
  });
}

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
}

window.addEventListener("keydown", handleKeys);
WRAPPER.addEventListener("click", handleClick);
