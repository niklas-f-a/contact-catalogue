import Validator from '../validator'

describe('Validate', () => {
  describe('validateEmail', () => {

    it('should save error message with no valid email sent in as arg', () => {
      Validator.validateEmail('hej')
      expect(Validator.hasError).toBe(true)
      expect(Validator.errorMessage).toMatch([{ error: 'email is missong' }])
    })

    it('should have no error message with correct email', () => {
      Validator.validateEmail('hej@gmail.com')
      expect(Validator.hasError).toBe(false)
      expect(Validator.errorMessage).toBe(null)
    })

  })
  describe('validateZipCode', () => {
    it('should return error message with invalid zip code', () => {

    })
    it('should have no error message with correct zip code', () => {

    })
  })

  describe('validatePersonalNumber', () => {
    it('should return error message with invalid personal number', () => {

    })
    it('should have no error message with correct personal number', () => {

    })
  })

  describe('validateText', () => {
    it('should return error message with invalid text', () => {

    })
    it('should have no error message with correct text', () => {

    })
  })
})