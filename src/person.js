import Component from "./component.js";
import Action from "./action.js";
import { render, reactive } from "./viewBuilder/";
import Bar from "./bar.js";
import Log from "./log.js";
import { join, pluralize } from "./utils.js";

/**
 * @typedef {object} PersonData
 * @property {string} name - Name of the person
 * @property {number} [health = 100] - Health (0 - 100)
 * @property {number} [energy = 100] - Energy (0 - 100)
 * @property {string[]} [actions] - List of actions ID
 */

/**
 * @class Person
 * @extends Component
 */
export default class Person extends Component {
    /**
     * @constructor
     * @param {PersonData} data -
     */
    constructor (data) {
        super();

        this.name = data.name;
        this.busy = false;
        this.health = new Bar("#d21b3a", data.health);
        this.energy = new Bar("#29be7c", data.energy);
        this.actions = (data.actions || []).map(key => new Action(Action.data[key]));
    }

    /**
     */
    toggleBusy () {
        this.busy = !this.busy;
        this.node.classList.toggle("busy", this.busy);
        this.actions.forEach(({ node }) => node[this.busy ? "setAttribute" : "removeAttribute"]("disabled", true));
    }

    /**
     * @param {...ActionData} actions -
     */
    addAction (...actions) {
        actions.forEach((actionData) => {
            const action = new Action(actionData);
            this.actions.push(action);

            action.on("start", (started) => {
                this.toggleBusy();
                if (started.energy) {
                    this.energy.value -= started.energy;
                }
            });

            action.on("end", (done) => {
                this.toggleBusy();

                let earnings = [];
                if (done.earn) {
                    earnings = done.earn;
                    this.fire("earnResources", earnings);
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
                    this.fire("addLog", Log.replace(done.log, {
                        person: this,
                        action: done,
                        resources: join(earnings.map(([amount, { name }]) => `${amount} ${pluralize(name, amount)}`)),
                    }));
                }
            });
        });
    }

    /**
     * @param {...ActionData} actions -
     */
    removeAction (...actions) {
        actions.forEach((actionData) => {
            this.actions.splice(this.actions.findIndex(act => act.data === actionData), 1);
        });
    }

    /**
     * @inheritDoc
     */
    render () {
        return super.render(undefined, undefined, [
            reactive(this, "name", (name, node) => render(node || "h2", {
                class: "name",
            }, [name])),
            render(undefined, undefined, [
                this.health.node,
                this.energy.node,
            ]),
            reactive(this, "actions", actions => render(undefined, {
                class: "actions",
            }, actions)),
        ]);
    }

    /**
     * @inheritDoc
     */
    static get style () {
        return {
            display: "flex",
            "flex-direction": "column",
            gap: "10px",
            padding: "15px",
            border: "1px solid #666",

            ".name": {
                margin: "0",
            },

            ".actions": {
                display: "flex",
                gap: "10px",
            },

            "&.busy .action:not(.doing)": {
                opacity: ".5",
            },
        };
    }
}
