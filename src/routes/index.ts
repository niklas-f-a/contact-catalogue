import contactsRoute from './contacts.route'
import { createContact, getAllContacts, findContactById } from '../db/models/contact.service'

const routes = {
  contactsRoute: contactsRoute({ createContact, getAllContacts, findContactById })
}


export default routes