import Person from "./person.js";
import { render } from "./viewBuilder";
import Component from "./component.js";
import Logs from "./logs.js";
import Action from "./action.js";

/**
 * @typedef {object} GameData
 * @property {}
 */
/**
 * @class Game
 * @extends Component
 */
export default class Game extends Component {
    #personListNode;
    #resourceListNode;
    #logsListNode;

    /**
     *
     * @constructor
     */
    constructor () {
        super();
        this.persons = [];
        this.resources = [];

        this.#resourceListNode = render(undefined, {
            class: "resources",
        }, this.resources.map(({ node }) => node));
        this.#personListNode = render(undefined, {
            class: "persons",
        }, this.persons.map(({ node }) => node));
        this.#logsListNode = new Logs();
    }

    /**
     *
     * @param {...PersonData} persons -
     */
    addPerson (...persons) {
        persons.forEach((data) => {
            const person = new Person(data);
            person.addAction(Action.data.wakeUp);
            person.on("addLog", log => this.#logsListNode.addMessage(log));
            this.persons.push(person);
            this.#personListNode.appendChild(person.node);
        });
    }

    render () {
        return super.render(undefined, undefined, [
            this.#resourceListNode,
            this.#personListNode,
            this.#logsListNode.node,
        ]);
    }

    static get style () {
        return {
            ".resources": {
                background: "#eeac56",
                padding: "5px",
            },
            ".persons": {
                padding: "5px",
            },
        };
    }
}
