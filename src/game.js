import Person from "./person.js";
import { render } from "./viewBuilder";
import Component from "./component.js";

/**
 * @class Game
 * @extends Component
 */
export default class Game extends Component {
    #personListNode;
    #resourceListNode;

    constructor () {
        super();
        this.persons = [];
        this.resources = [];

        this.#resourceListNode = render("div", {
            class: "resources",
        }, this.resources.map(({ node }) => node));
        this.#personListNode = render("div", {
            class: "persons",
        }, this.persons.map(({ node }) => node));
    }

    /**
     *
     * @param {...PersonData} persons -
     */
    addPerson (...persons) {
        persons.forEach((data) => {
            const person = new Person(data);
            this.persons.push(person);
            this.#personListNode.appendChild(person.node);
        });
    }

    render () {
        return super.render(undefined, undefined, [
            this.#resourceListNode,
            this.#personListNode,
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
