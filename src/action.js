import Component from "./component.js";
import Resource from "./resource.js";
import Bus from "./bus.js";
import Log from "./log.js";

/**
 * @typedef {object} ActionData
 * @extends {ComponentData}
 * @property {number} time -
 * @property {string} log -
 * @property {string[]} [lock] -
 * @property {string[]} [unlock] -
 * @property {string} [build] -
 * @property {string} [destroy] -
 * @property {function} [onEnd] -
 */

/**
 * @class Action
 * @extends Component
 */
export default class Action extends Component {
    /**
     *
     * @constructor
     * @param {ActionData} data -
     */
    constructor (data) {
        super();
        this.data = data;
        this.doing = false;

        this.node.addEventListener("click", () => this.start());
    }

    /**
     * @inheritDoc
     */
    render () {
        return super.render("button", {
            style: `animation-duration: ${this.data.time}ms`,
        }, [
            this.data.name,
        ]);
    }

    /**
     */
    start () {
        if (this.doing) {
            return;
        }

        this.doing = true;
        this.node.classList.add("doing");

        setTimeout(() => this.end(), this.data.time);

        this.fire("start", this.data);
    }

    /**
     */
    end () {
        this.doing = false;
        this.node.classList.remove("doing");

        if (typeof this.data.onEnd === "function") {
            this.data.onEnd(this.data);
        }

        this.fire("end", this.data);
    }

    /**
     * @inheritDoc
     */
    static get style () {
        return {
            border: "1px solid",
            "border-color": "#28c05a",
            background: "none",
            cursor: "pointer",
            "line-height": "2em",
            color: "inherit",

            "&.doing": {
                animation: "doing linear",
            },
        };
    }
}

Action.data = {
    wakeUp: {
        name: "Wake up",
        time: 1,
        log: "@person.name wake up with difficulty.",
        once: true,
        unlock: ["lookAround"],
        onEnd () {
            setTimeout(() => {
                Bus.fire("addLog", "Where am I ?", Log.types.quote);
            }, 500);
        },
    },
    lookAround: {
        name: "Look around",
        time: 500,
        log: "@person.name looks around, but find nothing but a burning shipwreck with @resources inside.",
        once: true,
        earn: [[10, Resource.data.water], [5, Resource.data.food]],
        unlock: ["settle"],
    },
    settle: {
        name: "Settle",
        time: 3000,
        energy: 10,
        log: "Regrouping some aluminum panels and torn clothes, @person.name manage to construct a basic shelter.",
        once: true,
        unlock: ["gather", "recruit"],
    },
    gather: {
        name: "Gather",
        time: 1000,
        energy: 10,
        log: "@person.name brings back @resources",
        unlock: ["roam"],
    },
    roam: {
        name: "Roam",
        time: 2000,
        energy: 15,
        consume: [[1, Resource.data.water]],
        log: "After some roaming around, @person.name found nothing.",
    },
    recruit: {
        name: "Recruit",
        time: 100,
        energy: 30,
        onEnd () {
            Bus.fire("addPerson", {
                name: "Bot",
            });
        },
    },
};
