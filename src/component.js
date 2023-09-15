import { render, renderStyle } from "./viewBuilder";

/**
 * @class Component
 */
export default class Component {
    #node;

    #eventListeners = {};

    stylize () {
        if (!this.constructor.styled && this.constructor.style) {
            const style = document.createElement("style");
            style.textContent = `.${this.constructor.name.toLowerCase()} {${renderStyle(this.constructor.style)}
}`;
            document.head.appendChild(style);
            this.constructor.styled = true;
        }
    }

    get node () {
        this.stylize();

        if (!this.#node) {
            this.#node = this.render();
        }

        return this.#node;
    }

    /**
     *
     * @param {string} [element = "div"] -
     * @param {object} [props = {}] -
     * @param {HTMLElement[]} [children = []] -
     * @return {HTMLElement}
     */
    render (element = "div", props = {}, children = []) {
        return render(element, {
            ...props,
            class: this.constructor.name.toLowerCase(),
        }, children);
    }

    on (eventName, listener) {
        if (!this.#eventListeners[eventName]) {
            this.#eventListeners[eventName] = [];
        }

        this.#eventListeners[eventName].push(listener);
    }

    fire (eventName, data) {
        if (this.#eventListeners[eventName]) {
            this.#eventListeners[eventName].forEach(listener => listener(data));
        }
    }
}
