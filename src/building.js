/**
 * @typedef {Object} BuildingData
 * @extends {ComponentData}
 */

/**
 * @class
 */
export default class Building {
    /**
     * @constructor
     * @param {BuildingData} data -
     */
    constructor (data) {
        this.data = data;
    }
}

/**
 * @type {Object<string, BuildingData>}
 */
Building.data = {
    forum: {
        name: "Forum",
    },
};

Building.events = {
    build: "buildBuilding",
};
