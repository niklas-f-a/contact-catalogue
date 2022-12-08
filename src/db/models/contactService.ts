import Contact from "./contacts";


export const createContact = async (newContact: Contact) => {
  await Contact.create(newContact)
}

export const getAllContacts = async (page: number, limit: number) => {
  await Contact.find().limit(limit).skip(page)
}