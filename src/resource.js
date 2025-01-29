import { render } from "@gmartigny/whiskers.js";

export const events = {
    earn: Symbol("earn-resource"),
    consume: Symbol("consume-resource"),
};

export default {
    render (value, node) {
        return render(node ?? "li", {
            class: "resource",
        });
    },
    styles: {
        ".resource": {
        },
    },
};
