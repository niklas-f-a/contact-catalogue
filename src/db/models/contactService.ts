import Contact from "./contacts";


export const createContact = async (newContact: Contact) => {
  await Contact.create(newContact)
}