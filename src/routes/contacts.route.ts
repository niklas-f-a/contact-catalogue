import express from 'express'
import Contact from '../db/models/contacts.model'
import { validatePostContact, validateObjectId } from '../validation'
import { parsePageQuery } from '../util/helper'
import { geoLocate } from '../db/models/contact.service'

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

      let contactsWithGeo: Contact[] = []
      for(let contact of contacts) {
        const geo = await geoLocate(contact.city, contact.country)
        contactsWithGeo = [...contactsWithGeo, { ...contact, ...geo[0] }]
      }

      res.status(200).json(contactsWithGeo)
    } catch (error) {
      res.status(500).send()
    }
  })

  router.get('/:id', validateObjectId, async (req, res) => {
    const { id } = req.params

    try {
      const contact = await findContactById(id)

      if(!contact) {
        res.status(404).send()
      } else {
        const geo = await geoLocate(contact.city, contact.country)
        const contactWithGeo = { ...contact, ...geo[0]}

        res.status(200).json(contactWithGeo)
      }
    } catch (error) {
      res.status(500).send()
    }
  })

  return router
}