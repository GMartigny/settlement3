/**
 * @class
 */
export default class Save {
    /**
     * @constructor
     * @param {Storage} db -
     */
    constructor (db) {
        this.db = db;
    }

    /**
     * @param {string} key -
     * @return {*}
     */
    get (key) {
        return this.db.get(key);
    }

    /**
     * @param {string} key -
     * @param {*} value -
     * @return {Save}
     */
    set (key, value) {
        this.db.setItem(key, value);
        return this;
    }
}
