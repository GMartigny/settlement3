import Person from "./person.js";
import { reactive, render } from "./viewBuilder";
import Component from "./component.js";
import Log from "./log.js";
import Action from "./action.js";
import Resource from "./resource.js";
import Bus from "./bus.js";

/**
 * @class Game
 * @extends Component
 */
export default class Game extends Component {
    /**
     * @constructor
     */
    constructor () {
        super();
        /**
         * @type {Resource[]}
         */
        this.resources = [];
        /**
         * @type {Person[]}
         */
        this.persons = [];
        /**
         * @type {Log[]}
         */
        this.logs = [];

        /**
         * @type {string[]}
         */
        this.unlockedActions = [];

        Bus.on("addPerson", this.addPerson.bind(this));
        Bus.on("addLog", this.addLog.bind(this));
        Bus.on("earnResources", this.earnResources.bind(this));
    }

    /**
     * @param {...PersonData} persons -
     */
    addPerson (...persons) {
        persons.forEach((personData) => {
            const person = new Person({
                ...personData,
                actions: this.unlockedActions,
            });
            person.on("addLog", this.addLog.bind(this));
            person.on("earnResources", this.earnResources.bind(this));
            this.persons.push(person);
            person.addAction(Action.data.wakeUp);
        });
    }

    /**
     * @param {[number, ResourceData][]} earnings -
     */
    earnResources (earnings) {
        earnings.forEach(([amount, data]) => {
            const resource = this.resources.find(each => data === each.data);
            if (resource) {
                resource.amount += amount;
            }
            else {
                this.resources.push(new Resource(data, amount));
            }
        });
    }

    /**
     * @param {...*} args -
     */
    addLog (...args) {
        this.logs.unshift(new Log(...args));
    }

    /**
     * @inheritDoc
     */
    render () {
        return super.render(undefined, undefined, [
            reactive(this, "resources", (resources, node) => render(node, {
                class: "resources",
            }, resources)),
            render("main", {
                class: "main",
            }, [
                reactive(this, "persons", (persons, node) => render(node, {
                    class: "persons",
                }, persons)),
                reactive(this, "logs", (logs, node) => render(node, {
                    class: "logs",
                }, logs)),
            ]),
        ]);
    }

    /**
     * @inheritDoc
     */
    static get style () {
        const display = "flex";

        return {
            display,
            "flex-direction": "column",
            height: "100vh",
            background: "#0B141A",
            color: "#fff",

            ".resources, .persons, .logs": {
                padding: "5px",
            },

            ".resources": {
                display,
                gap: "1em",
                background: "#855715",
            },

            ".main": {
                display,
                flex: "1 auto",
                overflow: "auto",
            },

            ".persons, .logs": {
                flex: "1 50%",
            },
        };
    }
}
