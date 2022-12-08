import axios from 'axios'
import Contact from "./contacts.model";

type GeoLocation = {
  name: string,
  latitude: number,
  longitude: number,
  country: string
}

export const createContact = async (newContact: Contact) => {
  await Contact.create(newContact)
}

export const getAllContacts = async (page: number, limit: number) =>
  await Contact.find().limit(limit).skip(page)

export const findContactById = async (id: string) =>
  await Contact.findById(id)

export const geoLocate = async (city: string, country: string): Promise<GeoLocation[]> =>
  await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`)
