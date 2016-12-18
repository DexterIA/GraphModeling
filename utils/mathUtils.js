let mathUtils = {};

/**
 * Возвращает случайное целое число
 * @param {Number} min - минимальное значение числа
 * @param {Number} max - максимальное значение числа
 * @returns {Number} случайное целое число
 */
mathUtils.getRandomInt = function  (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Возвращает случайное число с указанным значением чисел после запятой
 * @param {Number} min - минимальное значение числа
 * @param {Number} max - максимальное значение числа
 * @param {Number} accuracy - точность, количество чисел после запятой
 */
mathUtils.getRandomFloat = function (min, max, accuracy) {
  let randomInt = mathUtils.getRandomInt(min, max - 1);
  if (accuracy > 0) {
    let maxFloat = Math.pow(10, accuracy),
      randomFloatPart = mathUtils.getRandomInt(0, maxFloat);
    return randomInt + randomFloatPart/maxFloat;
  }
  return randomInt;
};

/**
 * Возвращает принадлежность точки окружности
 * @param {Number} radius - радиус окружности
 * @param {Point} point - проверяемая точка
 * @returns {Boolean} - принадлежит или нет
 */
mathUtils.circleMember = function (radius, point) {
  return Math.sqrt(Math.pow(point.x - radius, 2) + Math.pow(point.y - radius, 2)) <= radius
};

/**
 * Расстояние между двумя точками на плоскости
 * @param {Point} a - первая точка
 * @param {Point} b - вторая точка
 * @returns {Number} - расстояние между точками
 */
mathUtils.pointDistance = function (a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

module.exports = mathUtils;