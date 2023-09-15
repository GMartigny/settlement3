import Component from "./component.js";
import { render } from "./viewBuilder";

/**
 * @class
 */
export default class Logs extends Component {
    addMessage (text, type = "") {
        const message = render(undefined, {
            class: `message ${type}`,
        }, [text]);
        this.node.appendChild(message);
    }
}
