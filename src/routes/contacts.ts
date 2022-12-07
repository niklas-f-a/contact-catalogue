import express from 'express'
import Contact from '../db/models/contacts'

interface Args {
  createContact: (newContact: Contact) => Promise<void>
}

export default ({ createContact }: Args) => {
  const router = express.Router()

  router.post('/', async (req, res) => {
    try{
      await createContact(req.body)
      res.status(201).json({})

    } catch (error) {
      res.status(500).send()
    }
  })

  router.get('/', (req, res) => {

  })

  return router
}