

const _isWookieeFormat = (req) => {
    if (req.query.format && req.query.format == 'wookiee') {
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        const id = req.params.id;
        let data = {};
        data = await app.db.swPeople.findOne({ where: { id: id } });
        if (!data) {
            data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${id}`, 'GET', null, true);
        }
        res.send(data);
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        const id = req.params.id;
        let data = {};
        data = await app.db.swPlanet.findOne({ where: { id: id } });
        if (!data) {
            data = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${id}`, 'GET', null, true);
        }
        res.send(data);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        let personWeight = 0, dataPerson, dataPlanet, error;
        const person = app.swapiFunctions.getRandomInteger(30);
        const planet = app.swapiFunctions.getRandomInteger(30);
        dataPerson = await app.db.swPeople.findOne({ where: { id: person } });
        dataPlanet = await app.db.swPlanet.findOne({ where: { id: planet } });
        if (dataPerson && dataPlanet) {
            const gravity = dataPlanet.gravity.split(' ');
            const homeWorld = dataPerson.homeworld_id.split('/');
            if (parseInt(homeWorld[1]) === planet) {
                error = 'Error calculando peso de personaje en su planeta natal';
            } else {
                personWeight = app.swapiFunctions.getWeightOnPlanet(dataPerson.mass, gravity[0]);
            }
        } else {
            dataPerson = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/people/${person}`, 'GET', null, true);
            dataPlanet = await app.swapiFunctions.genericRequest(`https://swapi.dev/api/planets/${planet}`, 'GET', null, true);
            if (dataPerson && dataPlanet) {
                const gravity = dataPlanet.gravity.split(' ');
                const homeWorld = dataPerson.homeworld.split('/');
                if (parseInt(homeWorld[5]) === planet) {
                    error = 'Error calculando peso de personaje en su planeta natal';
                } else {
                    personWeight = app.swapiFunctions.getWeightOnPlanet(dataPerson.mass, gravity[0]);
                }
            }
        }
        res.send({ error, personWeight });
    });

    server.get('/hfswapi/getLogs', async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;