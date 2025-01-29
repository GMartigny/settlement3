const listeners = {};

export default {
    on (eventName, callback) {
        if (!listeners[eventName]) {
            listeners[eventName] = [];
        }

        listeners[eventName].push(callback);
    },
    fire (eventName, data) {
        listeners[eventName]?.forEach(callback => callback(data));
    },
};
