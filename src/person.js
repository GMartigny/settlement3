import Component from "./component.js";
import Action from "./action.js";
import { render } from "./viewBuilder";
import Bar from "./bar.js";

/**
 * @typedef {object} PersonData
 * @property {string} name -
 * @property {number} [health] -
 * @property {number} [energy] -
 * @property {string[]} [actions] -
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
    constructor (data) {
        super();

        this.name = data.name;
        this.health = new Bar("#be0627", data.health);
        this.energy = new Bar("#099858", data.energy);
        this.actions = (data.actions || []).map(key => new Action(Action.data[key]));

        this.#actionsListNode = render("div", {
            class: "actions",
        });
    }

    addAction (...actions) {
        actions.forEach((actionData) => {
            const action = new Action(actionData);
            this.actions.push(action);
            this.#actionsListNode.appendChild(action.node);

            action.on("start", () => {
                this.node.classList.add("busy");
            });

            action.on("end", (done) => {
                this.node.classList.remove("busy");

                if (done.unlock) {
                    this.addAction(
                        ...done.unlock
                            .filter(key => !this.actions.some(({ data }) => data === Action.data[key]))
                            .map(key => Action.data[key]),
                    );
                }

                if (done.log) {
                    this.fire("addLog", done.log);
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
