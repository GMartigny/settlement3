/**
 * @param {Array} array Array of strings
 * @param {string} separator Separator between items
 * @param {string} final Final separator
 * @return {string}
 */
function join (array, separator = ", ", final = "and") {
    return array.length ? `${array.slice(0, -1).join(separator)} ${final} ${array[array.length - 1]}` : "";
}

/**
 * @param {number} [min = 1] Maximum value if only one argument is provided, minimum value otherwise
 * @param {number} [max] Maximum value
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
 * @param {string} word Any word
 * @param {number} count Amount of items
 * @return {string}
 */
function pluralize (word, count) {
    return `${count} ${word}${count > 1 ? "s" : ""}`;
}

/**
 * @param {number} value Any number
 * @param {number} min Minimum value
 * @param {number} max Maximum value
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
