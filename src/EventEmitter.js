/**
 * @class
 */
export default class EventEmitter {
    #eventListeners = {};

    /**
     * @callback EventListener
     * @property {*} data -
     */
    /**
     * @param {string} eventName -
     * @param {EventListener} listener -
     */
    on (eventName, listener) {
        if (!this.#eventListeners[eventName]) {
            this.#eventListeners[eventName] = [];
        }

        this.#eventListeners[eventName].push(listener);
    }

    /**
     * @param {string} eventName -
     * @param {...*} data -
     */
    fire (eventName, ...data) {
        if (this.#eventListeners[eventName]) {
            this.#eventListeners[eventName].forEach(listener => listener(...data));
        }
    }

    /**
     * @param {string} eventName -
     * @param {EventListener} listener -
     */
    static stop (eventName, listener) {
        if (this.#eventListeners[eventName].length) {
            this.#eventListeners[eventName].splice(this.#eventListeners[eventName].indexOf(listener), 1);
        }
    }
}
