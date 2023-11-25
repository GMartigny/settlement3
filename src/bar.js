import Component from "./component.js";
import { reactive, render } from "./viewBuilder";
import { clamp } from "./utils.js";

/**
 * @class Bar
 * @extends Component
 */
export default class Bar extends Component {
    /**
     *
     * @constructor
     * @param {string} color -
     * @param {number} [value = 100] -
     */
    constructor (color, value = 100) {
        super();

        this.color = color;
        this.value = value;
    }

    /**
     * @inheritDoc
     */
    render () {
        return super.render(undefined, {
            style: `background: ${this.color}88`,
        }, [
            reactive(this, "value", (value, node) => render(node, {
                class: "value",
                style: `width: ${clamp(value, 0, 100)}%; background: ${this.color}`,
            })),
        ]);
    }

    /**
     * @inheritDoc
     */
    static get style () {
        return {
            height: "5px",

            ".value": {
                height: "100%",
                "border-radius": "0 5px 5px 0",
                transition: "width ease .3s",
            },
        };
    }
}
