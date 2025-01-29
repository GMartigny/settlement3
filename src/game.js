import { render, reactive } from "@gmartigny/whiskers.js";
import resource, { events as resourceEvents } from "./resource.js";
import person, { events as personEvent } from "./person.js";
import bus from "./bus.js";
import { actions } from "./data.js";
import { flow } from "./css";
import logger from "./logger";

export default {
    render () {
        const game = {
            resources: [],
            persons: [],
        };

        setTimeout(() => {
            bus.fire(personEvent.arrive, {
                name: "Alice",
                actions: [
                    actions.wakeUp,
                ],
            });
        }, 1000);

        bus.on(resourceEvents.earn, (newResource) => {
            game.resources.push(newResource);
        });

        bus.on(personEvent.arrive, (newArrival) => {
            game.persons.push(newArrival);
        });
        bus.on(personEvent.die, (dead) => {
            game.persons.splice(game.persons.indexOf(dead), 1);
        });

        return render("main", {
            class: "game",
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
                    (init, list) => render(list ?? "ul", {
                        class: "persons",
                    }, init),
                    person.render,
                ),
                logger.render,
            ]),
        ]);
    },
    styles: {
        ".game": {
            ".content": {
                ...flow.flex(),

                ".logs, .persons": {
                    flex: "1 50%",
                },
                ...logger.styles,
                ".persons": {
                    ...person.styles,
                },
            },
        },
    },
};
