/**
 * Клонирование простого объекта
 * @param {object} object
 * @returns {object}
 */
export function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

/**
 * Возвращает промис, который зарезолвится через заданное количество милисекунд
 * @param {number} time - время в милисекундах
 * @returns {Promise<unknown>}
 */
export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * Преобразование camelCase в kebab-case
 * @param {string} string
 * @returns {string}
 */
export function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
