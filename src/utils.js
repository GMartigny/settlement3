/**
 * @param {Array} array -
 * @param {string} separator -
 * @param {string} final -
 * @return {string}
 */
function join (array, separator = ", ", final = "and") {
    return array.length ? `${array.slice(0, -1).join(separator)} ${final} ${array[array.length - 1]}` : "";
}

/**
 * @param {number} [min = 1] -
 * @param {number} [max] -
 * @return {number}
 */
function random (min = 1, max = undefined) {
    let from = min;
    let to = max;
    if (max === undefined) {
        from = 0;
        to = min;
    }
    return (Math.random() * (to - from)) + from;
}

/**
 * @param {string} word -
 * @param {number} count -
 * @return {string}
 */
function pluralize (word, count) {
    return `${word}${count > 1 ? "s" : ""}`;
}

/**
 * @param {number} value -
 * @param {number} min -
 * @param {number} max -
 * @return {number}
 */
function clamp (value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export {
    join,
    random,
    pluralize,
    clamp,
};
