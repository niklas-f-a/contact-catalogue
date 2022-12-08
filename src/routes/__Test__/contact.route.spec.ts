import { default as request } from 'supertest'
import nock from 'nock'

import makeApp from '../../app'
import createContactRoutes from '../contacts.route'

const validContacts = [
  {
    id: "638cfd06f84b41a7be61ebad",
    firstname: "Anna",
    lastname: "Andersson",
    emai: "anna.andersson@gmail.com",
    personalnumber: "550713-1405",
    address: "Utvecklargatan 12",
    zipCode: "111 22",
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3251172,
    lng: 18.0710935
  },
  {
    id: "638cfd06f84b41a7be61eadb",
    firstname: "Erik",
    lastname: "Eriksson",
    email: "erik.eriksson@gmail.com",
    personalnumber: "740301-1405",
    address: "Utvecklargatan 12",
    zipCode: "111 22",
    city: "Stockholm",
    country: "Sweden",
    lat: 59.3251172,
    lng: 18.0710935
  },
]

nock(`https://api.api-ninjas.com`)
  .get('/v1/geocoding?city=Stockholm&country=Sweden')
  .reply(200)
  .persist()

const createContact = jest.fn().mockResolvedValue({pytt: 'i panna'})
const getAllContacts = jest.fn().mockResolvedValue(validContacts)
const findContactById = jest.fn().mockResolvedValue(validContacts[1])

const contactsRoute = createContactRoutes({ createContact, getAllContacts, findContactById })

const app = makeApp({ contactsRoute })

describe('Testing Contact Route', () => {

  describe('POST /contacts', () => {
    it('should throw error', async () => {
      createContact.mockImplementationOnce( () => { throw new Error('krasch') })
      await request(app)
              .post('/contacts')
              .send({
                firstname: "Anna",
                lastname: "Andersson",
                email: "anna.andersson@gmail.com",
                personalnumber: "550713-1405",
                address: "Utvecklargatan 12",
                zipCode: "111 22",
                city: "Stockholm",
                country: "Sweden"
              })
              .expect(500)
    })

    it('should respond with error messages if incorrect data is posted - statuscode 400', async () => {
      const response = await request(app)
                                .post('/contacts')
                                .send({})
                                .expect(400)

      expect(response.body).toEqual([
          { error: "firstname is missing"},
          { error: "lastname is missing"},
          { error: "correct email is missing"},
          { error: "correct personalnumber is missing"},
          { error: "address is missing"},
          { error: "correct zip is missing"},
          { error: "city is missing"},
          { error: "country is missing"},
        ])
    })

    it('should responde with statuscode 201', async () => {

      const newContact = {
        firstname: "Anna",
        lastname: "Andersson",
        email: "anna.andersson@gmail.com",
        personalnumber: "550713-1405",
        address: "Utvecklargatan 12",
        zipCode: "111 22",
        city: "Stockholm",
        country: "Sweden"
      }

      const response = await request(app)
                              .post('/contacts')
                              .send(newContact)
                              .expect(201)

    })
  })

  describe('GET /contacts', () => {
    it('should GET /contacts and respond with 200 statuscode and array of max 10 contacts', async () => {
      const res = await request(app)
                          .get('/contacts')
                          .expect(200)
                          .expect('Content-Type', /json/)

      expect(res.body).toEqual(validContacts)
      expect(res.body.length).toBeLessThanOrEqual(10)
    })

    it('shoul throw error with status code 500', async () => {
      getAllContacts.mockImplementationOnce(() => { throw new Error('Kraaaaasch') })
      await request(app)
              .get('/contacts')
              .expect(500)
    })

  })

  describe('Get /contacts/:id', () => {
    it('should GET /contact by id with status code 200', async () => {
      const res = await request(app)
                          .get('/contacts/638cfd06f84b41a7be61eadb')
                          .expect(200)
                          .expect('Content-Type', /json/)

      expect(res.body).toEqual(validContacts[1])
    })

    it('should throw an error when not sending a correct mongo object id', async () => {
      await request(app)
              .get('/contacts/868768')
              .expect(400)
    })

    it('should send back 404 statuscode when no contact found', async () => {
      findContactById.mockResolvedValue(null)
      await request(app)
              .get('/contacts/638cfd06f84b41a7be61eadb')
              .expect(404)
    })

    it('shoul throw error with status code 500', async () => {
      findContactById.mockImplementationOnce(() => { throw new Error('Kraaaaasch') })
      await request(app)
              .get('/contacts/638cfd06f84b41a7be61eadb')
              .expect(500)
    })
  })
})