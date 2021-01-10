"use strict";
// коды всех клавиш, используемых в калькуляторе
const KEYCODE = {
  Digit0: 48,
  Digit1: 49,
  Digit2: 50,
  Digit3: 51,
  Digit4: 52,
  Digit5: 53,
  Digit6: 54,
  Digit7: 55,
  Digit8: 56,
  Digit9: 57,
  Minus: 189,
  Numpad0: 96,
  Numpad1: 97,
  Numpad2: 98,
  Numpad3: 99,
  Numpad4: 100,
  Numpad5: 101,
  Numpad6: 102,
  Numpad7: 103,
  Numpad8: 104,
  Numpad9: 105,
  Equal: 187,
  NumpadMultiply: 106,
  NumpadSubtract: 109,
  NumpadAdd: 107,
  NumpadDivide: 111,
  NumpadEnter: 13,
  Escape: 27,
  Backspace: 8,
  Enter: 13,
  NumpadEnter: 13,
};

const BTNS = {
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
  btnReset: " ",
};

const OUTPUT_FIELD = document.querySelector(".result"); // поле вывода результата
const MAIN = document.querySelector(".wrapper"); // обертка калькулятора на которую вешается обработчик событий на клики мыши
let outputResult = ""; // результат
OUTPUT_FIELD.textContent = outputResult; // вывод результата в поле

// обработка нажатий клавиш
function handleKeys(evt) {
  if (KEYCODE.hasOwnProperty(evt.code)) {
    // если код нажатой клавиши есть в объекте KEYCODE
    switch (evt.code) {
      case "Backspace":
        deleteLastSymbol();
        break;
      case "Escape":
        resetOutput();
        break;
      case "Equal":
      case "Enter":
      case "NumpadEnter":
        renderCalc();
        break;
      default:
        outputResult += evt.key;
        OUTPUT_FIELD.textContent = outputResult;
    }
  }
}

// удаляем последний символ
function deleteLastSymbol() {
  outputResult = outputResult.slice(0, -1);
  OUTPUT_FIELD.textContent = outputResult;
}

// очищаем поле вывода
function resetOutput() {
  outputResult = "";
  OUTPUT_FIELD.textContent = outputResult;
}

// вывод результатов
function renderCalc() {
  outputResult = calculation(outputResult);
  OUTPUT_FIELD.textContent = outputResult;
}

// выбираем клики
function toggleClick(x) {
  switch (x) {
    case "btnBack":
      deleteLastSymbol();
      break;
    case "btnReset":
      resetOutput();
      break;
    case "btnEqually":
      renderCalc();
      break;
    default:
      outputResult += BTNS[x];
      OUTPUT_FIELD.textContent = outputResult;
  }
}

// обработка кликов мыши
function handleClick(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains("btn")) {
    toggleClick(evt.target.dataset.id);
  }
}

// поиск знаков с высоким приоритетом
function checkFirstPriority(x) {
  let reg = /(\d+)([/*])(\d+)/;
  return x.replace(reg, function (match, g1, g2, g3) {
    return g2 == "*" ? g1 * g3 : g1 / g3;
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
MAIN.addEventListener("click", handleClick);
