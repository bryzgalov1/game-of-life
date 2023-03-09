import { debug } from "../config";

const log = {
    time(label: string) {
        if (debug) {
            console.time(label);
        }
    },
    timeEnd(label: string) {
        if (debug) {
            console.timeEnd(label);
        }
    },
    error(text: string) {
        if (debug) {
            console.error(text);
        }
    },
};

export default log;
