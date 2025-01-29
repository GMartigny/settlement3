import { renderStyle } from "@gmartigny/whiskers.js";
import { variables } from "./css.js";

import game from "./game.js";

document.body.appendChild(game.render());

document.head.appendChild(renderStyle({
    body: {
        background: variables.black,
    },
    "*": {
        margin: "0",
        padding: "0",
        "box-sizing": "border-box",
        color: "#fff",
    },
    ul: {
        "list-style": "none",
    },

    ...game.styles,
}));
