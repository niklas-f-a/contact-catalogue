import express from 'express'
import Contact from '../db/models/contacts'
import { validatePostContact } from '../validation'

interface Args {
  createContact: (newContact: Contact) => Promise<Contact>
}

export default ({ createContact }: Args) => {
  const router = express.Router()

  router.post('/', validatePostContact, async (req, res) => {
    try{
      const createdContact = await createContact(req.body)

      if(createdContact) {
        res.status(201).json({})
      } else {
        res.status(400).send()

      }

    } catch (error) {
      res.status(500).send()
    }
  })

  router.get('/', (req, res) => {

  })

  return router
}