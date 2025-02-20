import { render } from "@gmartigny/whiskers.js";
import timer from "./timer";
import { clickable } from "./css";
import { dispatch } from "./utils";

export const events = {
    start: "action-start",
    end: "action-end",
};

export default {
    render (value, node) {
        let element;
        /**
         */
        function done () {
            value.onEnd?.(element);
            dispatch(events.end, element, value);
        }

        element = render(node ?? "button", {
            class: "action",
            "@click": () => {
                dispatch(events.start, element, value);
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

        return element;
    },
    styles: {
        ".action": {
            ...clickable,
        },
    },
};
