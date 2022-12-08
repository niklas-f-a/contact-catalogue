
type ErrorMessage = {
  error: string
}


class Validator {

  static errorMessages: ErrorMessage[] | null = null
  static hasError = this.errorMessages ? this.errorMessages.length > 0 : false

  static validateEmail(value: unknown) {
    return this
  }

  static validateZipCode(value: unknown) {
    return this
  }

  static validatePersonalNumber(value: unknown) {
    return this
  }

  static validateText(value: unknown) {
    return this
  }
}

export default Validator