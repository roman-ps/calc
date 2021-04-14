// поиск знаков с высоким приоритетом
function checkFirstPriority(x) {
  let reg = /(\d+)([/*])(\d+)/;
  return x.replace(reg, function (match, g1, g2, g3) {
    return g2 == "*" ? g1 * g3 : g1 / g3;
  });
};

// поиск знаков с низким приоритетом
/**
 * Поиск арифметических операций второго приоритета - сложение/вычитание
 * @param {*} x -
 * @returns возвращает результат операции двух чисел вокруг знака
 */
function checkSecondPriority(x) {
  let reg = /(\d+)([-+])(\d+)/;
  return x.replace(reg, function (match, g1, g2, g3) {
    return g2 == "+"
      ? parseInt(g1) + parseInt(g3)
      : parseInt(g1) - parseInt(g3);
  });
};

export {checkFirstPriority, checkSecondPriority}
