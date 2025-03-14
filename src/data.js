import { events as personEvents } from "./person";
import timer from "./timer";
import { events as loggerEvent, types as loggerTypes } from "./logger";
import { dispatch } from "./utils";

export const resources = {
    // ## GATHERABLES ##
    // COMMON
    water: {
        name: "water",
        description: "Much needed to survive",
    },
    food: {
        name: "food",
        description: "Expiration date says 2 years ago, but it's not a time to be picky.",
    },
    rock: {
        name: "rock",
        description: "\"There's rocks everywhere ! Why would you bring this back ?\"",
    },
    scrap: {
        name: "scrap",
        description: "An old and rusty piece of metal.",
    },
    // UNCOMMON
    bolt: {
        name: "nuts and bolts",
        description: "Little metal nuts and bolts to fasten anything in place.",
    },
    sand: {
        name: "sand",
        description: "Just pure fine sand.",
    },
    fuel: {
        name: "fuel",
        description: "About a liter of gas-oil.",
    },
    // RARE
    medication: {
        name: "medication",
        description: "An unlabeled medication, hope it's still good.",
    },
    electronics: {
        name: "electronics",
        description: "Some basic micro-electronics components.",
    },
    // SPECIAL
    ruin: {
        name: "ruin",
        description: "Directions to a point of interest found earlier.",
    },
    quartz: {
        name: "quartz",
        description: "A rough uncut gem of quartz. Quite valuable.",
    },
    // ## CRAFTABLES ##
    // BASIC
    component: {
        name: "component",
        description: "Some mechanical parts for others craftables.",
    },
    stone: {
        name: "stone",
        description: "A round and well polish stone.",
    },
    tool: {
        name: "tool",
        description: "A makeshift tool, good for a few uses.",
    },
    // COMPLEX
    brick: {
        name: "brick",
        description: "Will give walls for larger constructions.",
    },
    circuit: {
        name: "circuit",
        description: "That's a little rough, but it's actually a functioning circuit board.",
    },
    pipe: {
        name: "metal pipe",
        description: "Forged from junk metal.",
    },
    // ADVANCED
    jewelry: {
        name: "jewelry",
        description: "A really beautiful ornament useful for trading.",
    },
    engine: {
        name: "engine",
        description: "Amazing what can be done with all those scraps !",
    },
    computer: {
        name: "computer",
        description: "Well, Internet is down since 2025 but it can still be useful.",
    },
};

resources.gatherables = {
    common: [resources.water, resources.food, resources.rock, resources.scrap],
    uncommon: [resources.bolt, resources.sand, resources.fuel],
    rare: [resources.medication, resources.electronics],
};
resources.craftables = {
    basic: [resources.component, resources.stone, resources.tool],
    complex: [resources.brick, resources.circuit, resources.pipe],
    advanced: [resources.jewelry, resources.engine, resources.computer],
};

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
    earn: [[5, resources.water], [2, resources.food]],
    log: "@person.name brings back @earn",
    unlock: [roam],
};
const settle = {
    name: "Settle",
    time: 3000,
    energy: 10,
    log: "Regrouping some aluminum panels and torn clothes, @person.name manage to construct a basic shelter.",
    once: true,
    unlock: [gather],
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
    onEnd ({ parentNode }) {
        timer(() => {
            dispatch(loggerEvent.addLog, parentNode, {
                type: loggerTypes.quote,
                message: "Where am I ?",
            });
        }, 500);
    },
};
export const actions = {
    wakeUp,
    lookAround,
    settle,
    gather,
    roam,
};
