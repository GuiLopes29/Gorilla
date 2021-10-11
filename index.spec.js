const request = require('supertest')
const app = require('./server')

/* [CDB] */
describe('Gorila Endpoints CDB', () => {
    //TESTE DE VERIFICAÇÃO DE STATUS
    it('should get a api status running', async () => {
        const res = await request(app)
            .get('/api/v1/')
        expect(res.statusCode).toEqual(200)
    })

    it('should get a cdb list date and price', async () => {
        const res = await request(app)
            .post('/api/v1/cdb')
            .send({
              investmentDate: "2016-11-14",
              cdbRate: 103.5,
              currentDate: "2016-12-26"
            })
        expect(res.statusCode).toEqual(200)
    })

    it('should get a cdb error because investmentDate is incorrect date', async () => {
        const res = await request(app)
            .post('/api/v1/cdb')
            .send({
                investmentDate: "2016-13-14",
                cdbRate: 103.5,
                currentDate: "2016-12-26"
            })
        expect(res.statusCode).toEqual(400)
    })

  it('should get a cdb error because currentDate is incorrect date', async () => {
    const res = await request(app)
      .post('/api/v1/cdb')
      .send({
        investmentDate: "2016-11-14",
        cdbRate: 103.5,
        currentDate:"2016-12-32"
      })
    expect(res.statusCode).toEqual(400)
  })

  it('should get a cdb error because cdbRate is not a number', async () => {
    const res = await request(app)
      .post('/api/v1/cdb')
      .send({
        investmentDate: "2016-11-14",
        cdbRate: "test",
        currentDate:"2016-12-32"
      })
    expect(res.statusCode).toEqual(400)
  })
})