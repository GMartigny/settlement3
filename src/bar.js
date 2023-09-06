import Component from "./component.js";

/**
 * @class Bar
 * @extends Component
 */
export default class Bar extends Component {
    constructor (color) {
        super();

        this.color = color;
    }

    render() {
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
