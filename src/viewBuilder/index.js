/**
 *
 * @param {string} element -
 * @param {object} [props] -
 * @param {array<Node>} [children] -
 * @returns {HTMLElement}
 */
function render (element, props = {}, children = []) {
    const node = document.createElement(element);

    Object.keys(props).forEach(key => node.setAttribute(key, props[key]));

    children.forEach(child => node.appendChild(typeof child === "string" ? new Text(child) : child));

    return node;
}

/**
 *
 * @param {object} styles -
 * @returns {string}
 */
function renderStyle (styles) {
    return Object.keys(styles).reduce((style, key) => {
        if (typeof styles[key] === "string") {
            return `${style}
    ${key}: ${styles[key]};`;
        }

        return `${style}
${key} {${renderStyle(styles[key])}
}`;
    }, "");
}

export {
    render,
    renderStyle,
};
