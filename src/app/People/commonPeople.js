const AbstractPeople = require('./abstractPeople');
const app = require('..')
class CommonPeople extends AbstractPeople {

    async init() {
        const data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${this.id}`, 'GET', null, true);
        this.name = data.name;
        this.mass = data.mass;
        this.height = data.height;
        this.homeworldName = data.homeworld;
    }
}

module.exports =  CommonPeople ;