class AbstractPeople {

    constructor(id) {
        this.id = id;
        this.name;
        this.mass;
        this.height;
        this.homeworlId;
        this.homeworldName;
    }

    async init() {

    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworlId;
    }

    getWeightOnPlanet(planetId) {
        throw new Error('To be implemented');
    }

    toJson() {
        return {
            name: this.name,
            mass: this.mass,
        }
    }
}

module.exports = AbstractPeople;