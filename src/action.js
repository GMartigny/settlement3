import { render } from "@gmartigny/whiskers.js";
import timer from "./timer.js";
import { clickable } from "./css.js";
import bus from "./bus.js";

export const events = {
    end: Symbol("action-end"),
};

export default {
    render (value, node) {
        /**
         */
        function done () {
            value.onEnd?.();
            bus.fire(events.end, value);
        }

        return render(node ?? "button", {
            class: "action",
            "@click": () => {
                if (value.time) {
                    timer(done, value.time);
                }
                else {
                    done();
                }
            },
        }, [
            value.name,
        ]);
    },
    styles: {
        ".action": {
            ...clickable,
        },
    },
};
