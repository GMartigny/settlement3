import { render, renderStyle } from "./viewBuilder/";
import EventEmitter from "./EventEmitter.js";

/**
 * @class Component
 */
export default class Component extends EventEmitter {
    /**
     * @type {HTMLElement}
     */
    #node;

    /**
     */
    stylize () {
        if (!this.constructor.styled) {
            const style = document.createElement("style");
            style.textContent = `.${this.constructor.name.toLowerCase()} {${renderStyle(this.constructor.style)}
}`;
            document.head.appendChild(style);
            this.constructor.styled = true;
        }
    }

    /**
     * @return {HTMLElement}
     */
    get node () {
        this.stylize();

        if (!this.#node) {
            this.#node = this.render();
        }

        return this.#node;
    }

    /**
     * @param {string} [element] -
     * @param {Object} [props = {}] -
     * @param {(HTMLElement|*)[]} [children = []] -
     * @return {HTMLElement}
     */
    render (element, props = {}, children = []) {
        return render(element, {
            ...props,
            class: `${this.constructor.name.toLowerCase()}${props.class ? ` ${props.class}` : ""}`,
        }, children);
    }

    /**
     * @return {Object}
     */
    static get style () {
        return {};
    }
}
