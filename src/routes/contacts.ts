import express from 'express'
import Contact from '../db/models/contacts'
import { validatePostContact } from '../validation'
import { parsePageQuery } from '../util/helper'

interface Args {
  createContact: (newContact: Contact) => Promise<Contact>
  getAllContacts: (page: number, limit: number) => Promise<Contact[]>
}

export default ({ createContact, getAllContacts }: Args) => {
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

  router.get('/', async (req, res) => {
    const { page, limit } = parsePageQuery(req.query)

    try {
      const contacts = await getAllContacts(page, limit)

      res.status(200).json(contacts)
    } catch (error) {
      res.status(500).send()
    }
  })

  return router
}