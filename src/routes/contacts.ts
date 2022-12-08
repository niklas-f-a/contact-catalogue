import express from 'express'
import Contact from '../db/models/contacts'
import { validatePostContact, validateObjectId } from '../validation'
import { parsePageQuery } from '../util/helper'

interface Args {
  createContact: (newContact: Contact) => Promise<void>
  getAllContacts: (page: number, limit: number) => Promise<Contact[]>
  findContactById: (id: string) => Promise<Contact | null>
}

export default ({ createContact, getAllContacts, findContactById }: Args) => {
  const router = express.Router()

  router.post('/', validatePostContact, async (req, res) => {
    try{
      const createdContact = await createContact(req.body)

      res.status(201).json({})

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

  router.get('/:id', validateObjectId, async (req, res) => {
    const { id } = req.params

    const contact = await findContactById(id)

    if(!contact) {
      res.status(400).send()
    } else {
      res.status(200).json(contact)
    }
  })

  return router
}