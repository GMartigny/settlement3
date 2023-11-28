import reactive from "./reactive.js";

/**
 * @param {string|HTMLElement} [element = "div"] -
 * @param {Object} [props] -
 * @param {(HTMLElement|string)[]} [children] -
 * @returns {HTMLElement}
 */
function render (element, props = {}, children = []) {
    const node = element instanceof HTMLElement ? element : document.createElement(element || "div");

    Object.keys(props).forEach((key) => {
        switch (true) {
            case key.startsWith("."):
                node[key] = props[key.slice(1)];
                break;
            case key.startsWith("@"):
                node.addEventListener(key.slice(1), props[key]);
                break;
            default:
                node.setAttribute(key, props[key]);
        }
    });

    children.forEach(child => node.appendChild(typeof child === "string" ? new Text(child) : child));

    return node;
}

/**
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
    reactive,
};
