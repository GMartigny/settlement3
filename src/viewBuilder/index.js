/**
 *
 * @param {string} [element = "div"] -
 * @param {object} [props = {}] -
 * @param {(HTMLElement|string)[]} [children = []] -
 * @returns {HTMLElement}
 */
function render (element = "div", props = {}, children = []) {
    const node = document.createElement(element);

    Object.keys(props).forEach(key => node.setAttribute(key, props[key]));

    children.forEach(child => node.appendChild(typeof child === "string" ? new Text(child) : child));

    return node;
}

function reactiveSimple (context, target) {
    let value = context[target];
    const wrapper = new Text();

    function reflow () {
        wrapper.textContent = value;
    }

    Object.defineProperty(context, target, {
        get: () => value,
        set: (newValue) => {
            value = newValue;
            reflow();
        },
    });

    reflow();

    return wrapper;
}

class Emitter extends Array {
}

[
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
].forEach((name) => {
    Emitter.prototype[name] = function (...args) {
        Array.prototype[name].apply(this, args);

        if (this.onChange) {
            this.onChange(name, args);
        }
    };
});

function reactiveArray (context, target, wrapper = render()) {
    let value = new Emitter(...context[target]);

    function reflow (func, args) {
        switch (func) {
            case "push":
                args.forEach(({ node }) => wrapper.appendChild(node));
                break;
            case "splice":
                const [index, removed, ...added] = args;
                for (let i = 0; i < removed; ++i) {
                    wrapper.removeChild(wrapper.children[index]);
                }
                if (added.length) {
                    const pivot = wrapper.children[index] ?? null;
                    added.forEach(({ node }) => wrapper.insertBefore(node, pivot));
                }
                break;
            default:
                wrapper.innerHTML = "";
                value.forEach(({ node }) => wrapper.appendChild(node));
        }
    }

    value.onChange = reflow;

    Object.defineProperty(context, target, {
        get: () => value,
        set: (newValue) => {
            if (!Array.isArray(newValue)) {
                throw new Error(`Value of ${target} should be an array.`);
            }
            value = new Emitter(...newValue);
            reflow();
        },
    });

    reflow("init");

    return wrapper;
}

function reactive (context, target, wrapper) {
    if (Array.isArray(context[target])) {
        return reactiveArray(context, target, wrapper);
    }

    return reactiveSimple(context, target);
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
    reactive,
};
