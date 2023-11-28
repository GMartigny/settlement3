import Person from "./person.js";
import { reactive, render } from "./viewBuilder/";
import Component from "./component.js";
import Log from "./log.js";
import Action from "./action.js";
import Resource from "./resource.js";
import Bus from "./bus.js";
import Building from "./building.js";
import Save from "./save.js";

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
         * @type {Building[]}
         */
        this.buildings = [];

        this.save = new Save(window.localStorage);

        Bus.on("addPerson", this.addPerson.bind(this));
        Bus.on("addLog", this.addLog.bind(this));
        Bus.on(Resource.events.earn, this.earnResources.bind(this));
        Bus.on(Building.events.build, this.buildBuilding.bind(this));
    }

    /**
     * @param {...PersonData} persons -
     */
    addPerson (...persons) {
        persons.forEach((personData) => {
            const person = new Person(personData);
            person.on("addLog", this.addLog.bind(this));
            person.on(Resource.events.earn, this.earnResources.bind(this));
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
     * @param {BuildingData} data -
     */
    buildBuilding (data) {
        this.buildings.push(new Building(data));
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
        const flex = {
            display: "flex",
        };
        const margin = "5px";
        const spaced = {
            ...flex,
            padding: margin,
            gap: margin,
        };

        return {
            ...flex,
            "flex-direction": "column",
            height: "100vh",
            background: "#0B141A",
            color: "#fff",

            ".resources": {
                ...spaced,
                height: "2em",
                gap: "1em",
                background: "#855715",
                transition: "transform ease .3s",

                "&:empty": {
                    transform: "translate3d(0, -100%, 0)",
                },
            },

            ".main": {
                flex: "1 auto",
                ...flex,
                overflow: "auto",
            },

            ".persons, .logs": {
                flex: "1 50%",
                ...spaced,
                "flex-direction": "column",
            },
        };
    }
}
