import Component from "./component.js";
import Action from "./action.js";
import { render, reactive } from "./viewBuilder";
import Bar from "./bar.js";

/**
 * @typedef {object} PersonData
 * @property {string} name - Name of the person
 * @property {number} [health] - Health (0 - 100)
 * @property {number} [energy] - Energy (0 - 100)
 * @property {string[]} [actions] - List of actions ID
 */

/**
 * @class Person
 * @extends Component
 */
export default class Person extends Component {
    /**
     *
     * @constructor
     * @param {PersonData} data -
     */
    constructor (data) {
        super();

        this.name = data.name;
        this.busy = false;
        this.health = new Bar("#be0627", data.health);
        this.energy = new Bar("#099858", data.energy);
        this.actions = (data.actions || []).map(key => new Action(Action.data[key]));
    }

    toggleBusy () {
        this.busy = !this.busy;
        this.node.classList.toggle("busy", this.busy);
        this.actions.forEach(({ node }) => node[this.busy ? "setAttribute" : "removeAttribute"]("disabled", true));
    }

    addAction (...actions) {
        actions.forEach((actionData) => {
            const action = new Action(actionData);
            this.actions.push(action);

            action.on("start", () => {
                this.toggleBusy();
            });

            action.on("end", (done) => {
                this.toggleBusy();

                if (done.earn) {
                    // TODO
                }

                if (done.unlock) {
                    this.addAction(
                        ...done.unlock
                            .filter(key => !this.actions.some(({ data }) => data === Action.data[key]))
                            .map(key => Action.data[key]),
                    );
                }

                if (done.lock) {
                    this.removeAction(
                        ...done.lock.map(key => Action.data[key]),
                    );
                }

                if (done.once) {
                    this.removeAction(done);
                }

                if (done.log) {
                    this.fire("addLog", done.log);
                }
            });
        });
    }

    removeAction (...actions) {
        actions.forEach((actionData) => {
            this.actions.splice(this.actions.findIndex(act => act.data === actionData), 1);
        });
    }

    render () {
        return super.render(undefined, undefined, [
            reactive(this, "name"),
            this.health.node,
            this.energy.node,
            reactive(this, "actions", render(undefined, {
                class: "actions",
            })),
        ]);
    }

    static get style () {
        return {
            padding: "15px",
            border: "1px solid black",

            ".actions": {
                display: "flex",
                gap: "10px",
                padding: "10px",
            },

            "&.busy .action:not(.doing)": {
                opacity: ".5",
            },
        };
    }
}
