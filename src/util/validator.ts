
type ErrorMessage = {
  error: string
}

class Validator {

  static #emailRegex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)

  static hasError: boolean = false
  static #errorMessages: ErrorMessage[] = []

  static messages = () => {
    const message = this.#errorMessages
    this.#errorMessages = []
    return message
  }

  static checkError = () => {
    this.hasError = this.#errorMessages.length > 0
    return this
  }

  static validateEmail(value: unknown) {
    if(typeof value !== 'string' || !this.#emailRegex.test(value)) {

      this.#errorMessages.push({ error: 'correct email is missing' })
    }

    return this
  }

  static validateZipCode(value: unknown) {
    if(typeof value !== 'number' || value.toString().length !== 5) {
      this.#errorMessages.push({ error: 'correct zip is missing' })
    }

    return this
  }

  static validatePersonalNumber(value: unknown) {
    if(typeof value !== 'string') {
      this.#errorMessages.push({ error: 'correct personalnumber is missing' })
    } else {
      const splitted = value.split('-')
      if (splitted.length !== 2 || isNaN(+splitted[0]) || isNaN(+splitted[1])) {
        this.#errorMessages.push({ error: 'correct personalnumber is missing' })
      }
    }

    return this
  }

  static validateText(value: unknown, name: string = 'correct text') {
    if(typeof value !== 'string' || value.length === 0) {
      this.#errorMessages.push({ error: `${name} is missing` })
    }
    return this
  }
}

export default Validator