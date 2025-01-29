import { render, reactive } from "@gmartigny/whiskers.js";
import bus from "./bus.js";
import { variables } from "./css.js";

/**
 * @typedef {Object} Log
 * @prop {string} type
 * @prop {string} message
 */

/**
 * @type {{logs: Log[]}}
 */
const list = {
    logs: [],
};

export const events = {
    addLog: Symbol("add-log"),
};

export const types = {
    quote: "quote",
};

bus.on(events.addLog, (log) => {
    list.logs.unshift(log);
});

/**
 * @param {string} string Any string
 * @param {Object} data Additional data
 * @return {string}
 */
function format (string, data) {
    const regexp = /@(\w+(\.\w+)*)/g;
    const replacer = (_, group) => group.split(".").reduce((acc, value) => acc[value], data);
    return string.replace(regexp, replacer);
}

export default {
    render: reactive(
        list,
        "logs",
        (value, node) => render(node ?? "ul", {
            class: "logs",
        }, value),
        (value, node) => render(node ?? "li", {
            class: `log ${value.type}`,
        }, [format(value.message, value.data)]),
    ),
    styles: {
        ".logs": {
            ".log": {
                "&.quote": {
                    "font-style": "italic",
                    "font-size": "1.5em",
                    color: variables.grey,

                    "&:before": {
                        content: "'«'",
                    },
                    "&:after": {
                        content: "'»'",
                    },
                },
            },
        },
    },
};
