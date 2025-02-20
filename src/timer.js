export default (callback, time) => {
    let statedAt = null;
    let remaining = time;
    let timer = null;

    const api = {
        stop () {
            clearTimeout(timer);
            timer = null;
            return performance.now() - statedAt;
        },
        pause () {
            remaining = this.stop();
        },
        start () {
            statedAt = performance.now();
            timer = setTimeout(() => {
                callback();
            }, remaining);
        },
    };

    api.start();

    return api;
};
