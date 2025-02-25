import { render, reactive } from "@gmartigny/whiskers.js";
import action, { events as actionEvents } from "./action";
import { flow, variables } from "./css";
import { events as loggerEvents } from "./logger";
import { pluralize, join, dispatch } from "./utils";
import { events as resourceEvents } from "./resource";

/**
 * @typedef {Object} Person
 * @prop {string} name
 * @prop {number} health
 * @prop {number} energy
 */

export const events = {
    arrive: "person-arrive",
    die: "person-die",
};

export default {
    render (value, node) {
        const element = render(node, {
            class: "person",
            [`@${actionEvents.end}`]: ({ detail }) => {
                const data = {
                    person: value,
                    action: detail,
                };

                if (detail.once) {
                    value.actions.splice(value.actions.indexOf(detail), 1);
                }

                if (detail.unlock?.length) {
                    data.unlock = detail.unlock;
                    value.actions.push(...detail.unlock.filter(unlocked => !value.actions.includes(unlocked)));
                }

                if (detail.lock?.length) {
                    data.lock = detail.lock;
                    value.actions = value.actions.filter(locked => !detail.lock.includes(locked));
                }

                if (detail.earn?.length) {
                    data.earn = join(detail.earn.map(([amount, resource]) => pluralize(resource.name, amount)));
                    dispatch(resourceEvents.earn, element, detail.earn);
                }

                if (detail.log) {
                    dispatch(loggerEvents.addLog, element, {
                        message: detail.log,
                        data,
                    });
                }
            },
        }, [
            render("h2", {
                class: "name",
            }, [value.name]),

            reactive(
                value,
                "actions",
                (init, list) => render(list, {
                    class: "actions",
                }, init),
                action.render,
            ),
        ]);

        return element;
    },
    styles: {
        ".person": {
            padding: "1em",
            border: `1px dashed ${variables.primary}`,

            ".actions": {
                ...flow.flex(),

                ...action.styles,
            },
        },
    },
};
