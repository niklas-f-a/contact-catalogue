import { Request, Response, NextFunction } from 'express'
import Validator from '../util/validator';

export const validatePostContact = (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, personalnumber, address, zipCode, city, country } = req.body

  Validator
  .validateText(firstname, 'firstname')
  .validateText(lastname, 'lastname')
  .validateEmail(email)
  .validatePersonalNumber(personalnumber)
  .validateText(address, 'address')
  .validateZipCode(zipCode)
  .validateText(city, 'city')
  .validateText(country, 'country')

  if(Validator.checkError().hasError) {
    res.status(400).json(Validator.messages())
  } else {
    next()
  }

}

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  Validator.isMObjectId(id)

  if(Validator.checkError().hasError) {
    res.status(400).json(Validator.messages())
  } else {
    next()
  }
}