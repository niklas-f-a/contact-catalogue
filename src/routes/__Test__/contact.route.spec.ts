import { default as request } from 'supertest'
import makeApp from '../../app'

const app = makeApp()

describe('Testing Contact Route', () => {

  describe('GET /contacts', () => {
    it('should respond with 200 statuscode and array of contacts', async () => {
      const res = await request(app)
                          .get('/contacts')
                          .expect(200)
                          .expect('Content-Type', /json/)

      expect(res.body.data).toStrictEqual([{
        "firstname": "Anna",
        "lastname": "Andersson",
        "email": "anna.andersson@gmail.com",
        "personalnumber": "550713-1405",
        "address": "Utvecklargatan 12",
        "zipCode": "111 22",
        "city": "Stockholm",
        "country": "Sweden"
      }])
    })
  })
})