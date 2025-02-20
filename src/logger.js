import { render } from "@gmartigny/whiskers.js";
import { variables } from "./css";

/**
 * @typedef {Object} Log
 * @prop {string} type
 * @prop {string} message
 */

export const events = {
    addLog: "add-log",
};

export const types = {
    quote: "quote",
};

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
    render: (value, node) => render(node, {
        class: `log ${value.type ?? ""}`,
    }, [format(value.message, value.data)]),
    styles: {
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
};
