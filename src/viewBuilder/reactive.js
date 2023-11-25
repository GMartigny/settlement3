/**
 * @callback renderCallback
 * @param {*} value
 * @param {HTMLElement?} node
 * @return {HTMLElement}
 */

/**
 * @param {Object} context -
 * @param {string} target -
 * @param {renderCallback} render -
 * @return {HTMLElement}
 */
function reactiveNode (context, target, render) {
    let value = context[target];

    const node = render(value);

    Object.defineProperty(context, target, {
        get: () => value,
        set: (newValue) => {
            value = newValue;
            render(value, node);
        },
    });

    return node;
}

/**
 * Copy of Array class to preserve its prototype
 * @class
 * @extends Array
 */
class EmitterArray extends Array {
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
    EmitterArray.prototype[name] = function (...args) {
        Array.prototype[name].apply(this, args);

        if (this.onChange) {
            this.onChange(name, args);
        }
    };
});

/**
 * @param {Object} context -
 * @param {string} target -
 * @param {renderCallback} render -
 * @return {*}
 */
function reactiveArray (context, target, render) {
    let value = new EmitterArray(...context[target]);
    const wrapper = render(value);

    /**
     * @param {string} func -
     * @param {...*} args -
     */
    function reflow (func, args) {
        switch (func) {
            case "push":
                args.forEach(({ node }) => wrapper.appendChild(node));
                break;
            case "splice":
                // eslint-disable-next-line no-case-declarations
                const [index, removed, ...added] = args;
                for (let i = 0; i < removed; ++i) {
                    wrapper.removeChild(wrapper.children[index]);
                }
                if (added.length) {
                    const pivot = wrapper.children[index] ?? null;
                    added.forEach(({ node }) => wrapper.insertBefore(node, pivot));
                }
                break;
            case "unshift":
                args.forEach(({ node }) => {
                    if (wrapper.children.length) {
                        wrapper.insertBefore(node, wrapper.firstChild);
                    }
                    else {
                        wrapper.appendChild(node);
                    }
                });
                break;
            default:
                wrapper.innerHTML = "";
                value.forEach(each => wrapper.appendChild(render(each)));
        }
    }
    value.onChange = reflow;

    Object.defineProperty(context, target, {
        get: () => value,
        set: (newValue) => {
            if (!Array.isArray(newValue)) {
                throw new Error(`Value of ${target} should be an array.`);
            }
            value = new EmitterArray(...newValue);
            reflow("set");
        },
    });

    return wrapper;
}

/**
 * @param {Object} context -
 * @param {string} target -
 * @param {renderCallback} render -
 * @return {HTMLElement|HTMLElement[]}
 */
export default function reactive (context, target, render) {
    if (context[target] === undefined) {
        throw new Error(`The prop [${target}] doesn't exists on [${context.constructor.name}]`);
    }
    return (Array.isArray(context[target]) ? reactiveArray : reactiveNode)(context, target, render);
}
