const request = require('supertest')
let server;

describe('routes/centralizedOfficer/weaponModels', () => {
    
    beforeEach(() => server = require('../../../server'))
    
    afterEach(() => server.close())

    describe('GET', () => {
        it("should return all Weapon Models", async () => {
            let res = await request(server).get('/centralizedOfficer/weaponModels')
            expect(res.status).toBe(200)
        })
    })
})