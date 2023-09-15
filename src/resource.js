import Component from "./component.js";

/**
 * @typedef {object} ResourceData
 * @property {string} name
 *
 */
/**
 * @class Resource
 * @extends Component
 */
export default class Resource extends Component {
    /**
     * @constructor
     * @param {ResourceData} data -
     * @param {number} [amount = 0] -
     */
    constructor (data, amount = 0) {
        super();

        this.data = data;
        this.amount = amount;
    }

    render () {
        return super.render();
    }
}
