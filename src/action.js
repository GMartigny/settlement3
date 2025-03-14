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
         * End action
         */
        function done () {
            action.doing = false;
            action.onEnd?.(element);
            dispatch(events.end, element, action);
        }

        /**
         * Start action
         */
        function start () {
            if (!action.doing) {
                action.doing = true;
                dispatch(events.start, element, action);
                if (action.time) {
                    timer(done, action.time);
                }
                else {
                    done();
                }
            }
        }

        element = reactive(action, "doing", (value, node) => render(node ?? "button", {
            class: `action ${action.doing ? "loading" : ""}`,
            ".disabled": action.doing ? "disabled" : false,
            "--time": `${action.time ?? 0}ms`,
            "@click": start,
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
