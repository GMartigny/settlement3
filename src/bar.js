import Component from "./component.js";

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

    render () {
        return super.render(undefined, {
            style: `background: ${this.color}`,
        });
    }

    static get style () {
        return {
            height: "5px",
        };
    }
}
