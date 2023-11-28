import Component from "./component.js";

/**
 * @class
 * @extends Component
 */
export default class Log extends Component {
    /**
     * @constructor
     * @param {string} message -
     * @param {string} type -
     */
    constructor (message, type = Log.types.info) {
        super();

        this.message = message;
        this.type = type;
    }

    /**
     * @inheritDoc
     */
    render () {
        return super.render(undefined, {
            class: this.type,
        }, [this.message]);
    }

    /**
     * @param {string} str -
     * @param {Object} data -
     * @return {*}
     */
    static replace (str, data) {
        return str.replace(
            /@(\w+(\.\w+)*)/g,
            (_, group) => group.split(".").reduce((acc, value) => acc[value], data),
        );
    }

    /**
     * @typedef {Object} LogTypes
     * @property {string} info
     * @property {string} quote
     * @property {string} warn
     */
    /**
     * @return {LogTypes}
     */
    static get types () {
        return {
            info: "info",
            quote: "quote",
            warn: "warn",
        };
    }

    /**
     * @inheritDoc
     */
    static get style () {
        return {
            "padding-bottom": "5px",
            "border-bottom": "1px dashed #66666688",

            "&.quote": {
                "font-size": "1.5em",
                "font-style": "italic",
                color: "#999",

                "&:before": {
                    content: "'«'",
                },
                "&:after": {
                    content: "'»'",
                },
            },
        };
    }
}
