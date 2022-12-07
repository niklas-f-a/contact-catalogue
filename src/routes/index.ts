import contactsRoute from './contacts'
import { createContact } from '../db/models/contactService'

const routes = {
  contactsRoute: contactsRoute({ createContact })
}


export default routes