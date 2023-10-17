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
Resource.data = {
    water: {
        name: "Water",
        description: "Much needed to survive",
    },
    food: {
        name: "Food",
        description: "Expiration date says 2 years ago, but it's not a time to be picky.",
    },
};
