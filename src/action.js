import { reactive, render } from "@gmartigny/whiskers.js";
import timer from "./timer";
import { clickable, loading } from "./css";
import { dispatch } from "./utils";

export const events = {
    start: "action-start",
    end: "action-end",
};

export default {
    render (action) {
        action.doing = false;
        let element;
        /**
         */
        function done () {
            action.doing = false;
            action.onEnd?.(element);
            dispatch(events.end, element, action);
        }

        element = reactive(action, "doing", (value, node) => render(node ?? "button", {
            class: `action ${action.doing ? "loading" : ""}`,
            "--time": `${action.time ?? 0}ms`,
            "@click": () => {
                action.doing = true;
                dispatch(events.start, element, action);
                if (action.time) {
                    timer(done, action.time);
                }
                else {
                    done();
                }
            },
        }, [
            action.name,
        ]));

        return element;
    },
    styles: {
        ".action": {
            ...clickable,
            ...loading,
        },
    },
};
