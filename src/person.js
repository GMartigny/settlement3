import Component from "./component.js";
import Action from "./action.js";
import { render } from "./viewBuilder";
import Bar from "./bar.js";

/**
 * @typedef {object} PersonData
 * @property {string} name
 */

/**
 * @class Person
 * @extends Component
 */
export default class Person extends Component {
    #actionsListNode;

    /**
     *
     * @constructor
     * @param {PersonData} data -
     */
    constructor ({ name }) {
        super();

        this.name = name;
        this.health = new Bar("#be0627");
        this.energy = new Bar("#099858");
        this.actions = [];

        this.#actionsListNode = render("div", {
            class: "actions",
        });

        this.addAction(Action.data.wakeUp);
    }

    addAction (...actions) {
        actions.forEach((data) => {
            const action = new Action(data);
            this.actions.push(action);
            this.#actionsListNode.appendChild(action.node);

            action.on("start", () => {
                this.node.classList.add("busy");
            });

            action.on("end", (done) => {
                this.node.classList.remove("busy");

                if (done.unlock) {
                    this.addAction(...done.unlock.map(key => Action.data[key]));
                }
            });
        });
    }

    render () {
        return super.render(undefined, undefined, [
            this.name,
            this.health.node,
            this.energy.node,
            this.#actionsListNode,
        ]);
    }

    static get style () {
        return {
            padding: "15px",
            border: "1px solid black",

            ".actions": {
                padding: "10px",
            },

            "&.busy .action:not(.doing)": {
                opacity: ".5",
            },
        };
    }
}
