import Component from "./component.js";
import { reactive, render } from "./viewBuilder/";
import { pluralize } from "./utils.js";

/**
 * @typedef {object} ResourceData
 * @extends {ComponentData}
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

    /**
     * @inheritDoc
     */
    render () {
        return super.render(undefined, {
            class: this.data.name.toLowerCase(),
        }, [
            render("i", {
                class: "icon",
            }),
            reactive(
                this,
                "amount",
                (amount, node) => render(node || "span", undefined, [`${amount} ${pluralize(this.data.name, amount)}`]),
            ),
        ]);
    }

    /**
     * @inheritDoc
     */
    static get style () {
        return {
            display: "flex",
            "align-items": "center",
        };
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
Resource.events = {
    earn: "earnResources",
};
