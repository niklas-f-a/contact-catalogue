import Validator from '../validator'

describe('Validate', () => {
  describe('validateEmail', () => {

    it('should save error message with no valid email sent in as arg', () => {
      Validator.validateEmail('hej')
      expect(Validator.hasError).toBe(true)
      expect(Validator.errorMessage).toMatch([{ error: 'correct email is missong' }])
    })

    it('should have no error message with correct email', () => {
      Validator.validateEmail('hej@gmail.com')
      expect(Validator.hasError).toBe(false)
      expect(Validator.errorMessage).toBe(null)
    })

  })
  describe('validateZipCode', () => {
    it('should return error message with invalid zip code', () => {
      Validator.validateZipCode(12)
      expect(Validator.hasError).toBe(true)
      expect(Validator.errorMessage).toMatch([{ error: 'correct zip is missong' }])
    })

    it('should have no error message with correct zip code', () => {
      Validator.validateZipCode(12345)
      expect(Validator.hasError).toBe(false)
      expect(Validator.errorMessage).toMatch(null)
    })
  })

  describe('validatePersonalNumber', () => {
    it('should return error message with invalid personal number', () => {
      Validator.validatePersonalNumber(7998)
      expect(Validator.hasError).toBe(true)
      expect(Validator.errorMessage).toMatch([{ error: 'correct personalnumber is missong' }])
    })

    it('should have no error message with correct personal number', () => {
      Validator.validatePersonalNumber('781221-1222')
      expect(Validator.hasError).toBe(false)
      expect(Validator.errorMessage).toMatch(null)
    })
  })

  describe('validateText', () => {
    it('should return error message with invalid text', () => {
      Validator.validateText('')
      expect(Validator.hasError).toBe(true)
      expect(Validator.errorMessage).toMatch([{ error: 'correct text is missong' }])
    })

    it('should have no error message with correct text', () => {
      Validator.validateText('hej')
      expect(Validator.hasError).toBe(false)
      expect(Validator.errorMessage).toMatch(null)
    })
  })
})