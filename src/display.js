import { Scene, LinearGradient, Rectangle } from "pencil.js";

export default {
    render: (container) => {
        const scene = new Scene(container);

        const { width, height } = scene;

        scene.setOptions({
            fill: new LinearGradient([0, 0], [0, height / 2], {
                0: "#3c7bd1",
                1: "#a4b6e1",
            }),
        });

        scene
            .add(new Rectangle([0, height / 2], width, height / 2, {
                fill: "#c37a3e",
            }))
            .render();
    },
};
