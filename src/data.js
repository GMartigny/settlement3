import bus from "./bus.js";
import { events as personEvents } from "./person.js";
import timer from "./timer.js";
import { events as loggerEvent, types as loggerTypes } from "./logger.js";

export const resources = {
    water: {
        name: "Water",
        description: "Much needed to survive",
    },
    food: {
        name: "Food",
        description: "Expiration date says 2 years ago, but it's not a time to be picky.",
    },
};

export const actions = (() => {
    const roam = {
        name: "Roam",
        time: 2000,
        energy: 15,
        consume: [[1, resources.water]],
        log: "After some roaming around, @person.name found nothing.",
    };
    const gather = {
        name: "Gather",
        time: 1000,
        energy: 10,
        log: "@person.name brings back @resources",
        unlock: [roam],
    };
    const recruit = {
        name: "Recruit",
        time: 100,
        energy: 30,
        onEnd () {
            bus.fire(personEvents.arrive, {
                name: "Bot",
            });
        },
    };
    const settle = {
        name: "Settle",
        time: 3000,
        energy: 10,
        log: "Regrouping some aluminum panels and torn clothes, @person.name manage to construct a basic shelter.",
        once: true,
        unlock: [gather, recruit],
    };
    const lookAround = {
        name: "Look around",
        time: 500,
        log: "@person.name looks around, but find nothing but a burning shipwreck with @earn inside.",
        once: true,
        earn: [[10, resources.water], [5, resources.food]],
        unlock: [settle],
    };
    const wakeUp = {
        name: "Wake up",
        log: "@person.name wake up with difficulty.",
        once: true,
        unlock: [lookAround],
        onEnd () {
            timer(() => {
                bus.fire(loggerEvent.addLog, {
                    type: loggerTypes.quote,
                    message: "Where am I ?",
                });
            }, 500);
        },
    };

    return {
        wakeUp,
        lookAround,
        settle,
        gather,
        roam,
        recruit,
    };
})();
