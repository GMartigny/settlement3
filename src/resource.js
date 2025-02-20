import { render, reactive } from "@gmartigny/whiskers.js";

export const events = {
    earn: "earn-resource",
    consume: "consume-resource",
};

export default {
    render ([amount, resource], node) {
        const data = {
            amount,
            resource,
        };

        return render(node ?? "div", {
            class: "resource",
        }, [
            reactive(data, "amount", value => render("span", undefined, [value])),
            resource.name,
        ]);
    },
    styles: {
        ".resource": {
        },
    },
};
