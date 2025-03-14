import { renderStyle } from "@gmartigny/whiskers.js";
import { variables, animations } from "./css";
import game from "./game";

document.body.appendChild(game.render());

document.head.appendChild(renderStyle({
    html: {
        overflow: "hidden",
    },
    body: {
        background: variables.black,
    },
    "*": {
        margin: "0",
        padding: "0",
        "box-sizing": "border-box",
        color: "#fff",
    },
    ...animations,

    ...game.styles,
}));
