import Game from "./game.js";

const mainNode = document.createElement("main");

const game = new Game();
window.game = game;

mainNode.appendChild(game.node);
document.body.appendChild(mainNode);

game.addPerson({
    name: "Jim",
});
