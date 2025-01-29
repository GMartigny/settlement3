import { render, reactive } from "@gmartigny/whiskers.js";
import action, { events as actionEvents } from "./action.js";
import { flow } from "./css.js";
import bus from "./bus.js";
import { events as loggerEvents } from "./logger.js";
import { pluralize, join } from "./utils";

/**
 * @typedef {Object} Person
 * @prop {string} name
 * @prop {number} health
 * @prop {number} energy
 */

export const events = {
    arrive: Symbol("person-arrive"),
    die: Symbol("person-die"),
};

export default {
    render (value, node) {
        bus.on(actionEvents.end, (done) => {
            const data = {
                person: value,
                action: done,
            };

            if (done.once) {
                value.actions.splice(value.actions.indexOf(done), 1);
            }

            if (done.unlock?.length) {
                data.unlock = done.unlock;
                value.actions.push(...done.unlock);
            }

            if (done.earn?.length) {
                data.earn = join(done.earn.map(([amount, resource]) => pluralize(resource.name, amount)));
                bus.fire();
            }

            if (done.log) {
                bus.fire(loggerEvents.addLog, {
                    message: done.log,
                    data,
                });
            }
        });

        return render(node ?? "li", {
            class: "person",
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
    },
    styles: {
        ".person": {
            padding: "2em",

            ".actions": {
                ...flow.flex(),

                ...action.styles,
            },
        },
    },
};
