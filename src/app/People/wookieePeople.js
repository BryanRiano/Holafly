const AbstractPeople = require('./abstractPeople');
const app = require('..')

class WookieePeople extends AbstractPeople {

    async init() {
        const data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${this.id}?format=wookiee`, 'GET', null, true);
        this.name = data.whrascwo;
        this.mass = data.scracc;
        this.height = data.acwoahrracao;
    }
}

module.exports =  WookieePeople ;