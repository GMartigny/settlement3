import { render, reactive } from "@gmartigny/whiskers.js";
import resource, { events as resourceEvents } from "./resource";
import person, { events as personEvent } from "./person";
import { actions } from "./data";
import { flow } from "./css";
import logger, { events as loggerEvents } from "./logger";
import display from "./display";
import { dispatch } from "./utils";

export default {
    render () {
        const game = {
            resources: [],
            persons: [],
            logs: [],
        };

        const displayContainer = render("div", {
            class: "display",
        });

        const element = render("main", {
            class: "game",
            [`@${loggerEvents.addLog}`]: ({ detail }) => {
                game.logs.unshift(detail);
            },
            [`@${resourceEvents.earn}`]: ({ detail }) => {
                game.resources.push(...detail);
            },
            [`@${personEvent.arrive}`]: ({ detail }) => {
                game.persons.push(detail);
            },
            [`@${personEvent.die}`]: ({ detail }) => {
                game.persons.splice(game.persons.indexOf(detail), 1);
            },
        }, [
            reactive(
                game,
                "resources",
                (init, list) => render(list ?? "header", {
                    class: "resources",
                }, init),
                resource.render,
            ),
            render(undefined, {
                class: "content",
            }, [
                reactive(
                    game,
                    "persons",
                    (init, list) => render(list, {
                        class: "persons",
                    }, init),
                    person.render,
                ),
                reactive(
                    game,
                    "logs",
                    (init, list) => render(list, {
                        class: "logs",
                    }),
                    logger.render,
                ),
            ]),
            displayContainer,
        ]);

        setTimeout(() => {
            display.render(displayContainer);
        });

        setTimeout(() => {
            dispatch(personEvent.arrive, element, {
                name: "Alice",
                actions: [
                    actions.wakeUp,
                ],
            });
        }, 1000);

        return element;
    },
    styles: {
        ".game": {
            height: "100vh",
            overflow: "hidden",
            ...flow.flexCol(),

            ".resources": {
                ...flow.flex(),
                padding: "1em",
                background: "#533d20",

                "&:empty": {
                    transform: "translateY(-100%)",
                },

                ...resource.styles,
            },
            ".content": {
                flex: 1,
                ...flow.flex(),

                ".logs, .persons": {
                    flex: "1 50%",
                    ...flow.flexCol(),
                },
                ".persons": {
                    ...person.styles,
                },
                ".logs": {
                    ...logger.styles,
                },
            },
            ".display": {
                flex: 1,
            },
        },
    },
};
