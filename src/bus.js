import EventEmitter from "./EventEmitter.js";

/**
 * @class
 */
export default class Bus {
    /**
     * @constructor
     * @throws Error
     */
    constructor () {
        throw new Error("Invalid constructor invocation");
    }

    static #emitter = new EventEmitter();

    /**
     * @param {string} eventName -
     * @param {EventListener} listener -
     */
    static on (eventName, listener) {
        this.#emitter.on(eventName, listener);
    }

    /**
     * @param {string} eventName -
     * @param {...*} data -
     */
    static fire (eventName, ...data) {
        this.#emitter.fire(eventName, ...data);
    }
}
