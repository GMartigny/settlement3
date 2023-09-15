import Component from "./component.js";

/**
 * @typedef {object} ActionData
 * @property {string} name -
 * @property {number} time -
 * @property {string} log -
 * @property {string[]} lock -
 * @property {string[]} unlock -
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

    render () {
        return super.render("button", {
            style: `animation-duration: ${this.data.time}ms`,
        }, [
            this.data.name,
        ]);
    }

    start () {
        if (this.doing) {
            return;
        }

        this.doing = true;
        this.node.classList.add("doing");

        setTimeout(() => this.end(), this.data.time);

        this.fire("start", this.data);
    }

    end () {
        this.doing = false;
        this.node.classList.remove("doing");

        if (typeof this.data.onEnd === "function") {
            this.data.onEnd(this.data);
        }

        this.fire("end", this.data);
    }

    static get style () {
        return {
            border: "1px solid",
            "border-color": "#28c05a",
            background: "none",
            cursor: "pointer",
            "line-height": "2em",

            "&.doing": {
                animation: "doing linear",
            },
        };
    }
}

Action.data = {
    wakeUp: {
        name: "Wake up",
        time: 500,
        log: "@name just woke up.",
        lock: ["wakeUp"],
        unlock: ["gather"],
    },
    gather: {
        name: "Gather",
        time: 1000,
    },
};
