import { default as request } from 'supertest'
import makeApp from '../../app'
import createContactRoutes from '../contacts'

const contactsRoute = createContactRoutes()

const app = makeApp({ contactsRoute })

const validContacts = [
  {
    "id": "638cfd06f84b41a7be61ebad",
    "firstname": "Anna",
    "lastname": "Andersson",
    "email": "anna.andersson@gmail.com",
    "personalnumber": "550713-1405",
    "address": "Utvecklargatan 12",
    "zipCode": "111 22",
    "city": "Stockholm",
    "country": "Sweden",
    "lat": 59.3251172,
    "lng": 18.0710935
  },
  {
    "id": "638cfd06f84b41a7be61eadb",
    "firstname": "Erik",
    "lastname": "Eriksson",
    "email": "erik.eriksson@gmail.com",
    "personalnumber": "740301-1405",
    "address": "Utvecklargatan 12",
    "zipCode": "111 22",
    "city": "Stockholm",
    "country": "Sweden",
    "lat": 59.3251172,
    "lng": 18.0710935
  },
]

describe('Testing Contact Route', () => {

  describe('POST /contacts', () => {
    it('should respond with error messages if incorrect data is posted - statuscode 400', () => {

    })

    it('should return posted user with statuscode 201', async () => {
      const newContact = {
        "firstname": "Anna",
        "lastname": "Andersson",
        "email": "anna.andersson@gmail.com",
        "personalnumber": "550713-1405",
        "address": "Utvecklargatan 12",
        "zipCode": "111 22",
        "city": "Stockholm",
        "country": "Sweden"
        }

      await request(app)
              .post('/contacts')
              .send(newContact)
              .expect(201)
              .expect('Content-Type', /json/)
    })

  })

  describe('GET /contacts', () => {
    it('should GET /contacts and respond with 200 statuscode and array of max 10 contacts', async () => {
      const res = await request(app)
                          .get('/contacts')
                          .expect(200)
                          .expect('Content-Type', /json/)

      expect(res.body.data).toEqual(validContacts)
      expect(res.body.data.length).toBeLessThanOrEqual(10)
    })

  })

  describe('Get /contacts/:id', () => {
    it('should GET /contact by id with status code 200', async () => {
      const res = await request(app)
                          .get('/contacts/638cfd06f84b41a7be61eadb')
                          .expect(200)
                          .expect('Content-Type', /json/)

      expect(res.body.data).toEqual(validContacts[1])
    })

    it('should throw an error when not sending a correct mongo object id', () => {

    })

    it('should send back 404 statuscode when no contact found', () => {

    })
  })
})