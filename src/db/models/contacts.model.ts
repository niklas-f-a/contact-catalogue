import { Schema, model } from 'mongoose'

interface Contact {
  firstname: string,
  lastname: string,
  email: string,
  personalnumber: string
  address: string,
  zipCode: number,
  city: string,
  country: string
}

const contactSchema = new Schema<Contact>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  personalnumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  zipCode: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})


const Contact = model<Contact>('Contact', contactSchema)

export default Contact