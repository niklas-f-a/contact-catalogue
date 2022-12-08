import contactsRoute from './contacts'
import { createContact, getAllContacts, findContactById } from '../db/models/contactService'

const routes = {
  contactsRoute: contactsRoute({ createContact, getAllContacts, findContactById })
}


export default routes