import Validator from '../validator'

describe('Validate', () => {
  describe('Email', () => {
    it('should save error message with no valid email sent in as arg', () => {
      Validator.validateEmail('hej.com')
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct email is missing' }])
    })

    it('should have no error message with correct email', () => {
      Validator.validateEmail('hej@gmail.com')
      expect(Validator.checkError().hasError).toBe(false)
      expect(Validator.checkError().messages()).toEqual([])
    })

  })
  describe('ZipCode', () => {
    it('should return error message with invalid zip code', () => {
      Validator.validateZipCode(12)
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct zip is missing' }])
    })

    it('should return error message with invalid zip code', () => {
      Validator.validateZipCode(12345)
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct zip is missing' }])
    })

    it('should have no error message with correct zip code', () => {
      Validator.validateZipCode('123 45')
      expect(Validator.checkError().hasError).toBe(false)
      expect(Validator.checkError().messages()).toEqual([])
    })
  })

  describe('PersonalNumber', () => {
    it('should return error message with invalid personal number', () => {
      Validator.validatePersonalNumber('7998')
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct personalnumber is missing' }])
    })

    it('should return error message with invalid personal number', () => {
      Validator.validatePersonalNumber(7998)
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct personalnumber is missing' }])
    })

    it('should have no error message with correct personal number', () => {
      Validator.validatePersonalNumber('781221-1222')
      expect(Validator.checkError().hasError).toBe(false)
      expect(Validator.checkError().messages()).toEqual([])
    })
  })

  describe('Text', () => {
    it('should return error message with invalid text', () => {
      Validator.validateText(undefined)
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct text is missing' }])
    })

    it('should return error message with invalid text', () => {
      Validator.validateText('')
      expect(Validator.checkError().hasError).toBe(true)
      expect(Validator.checkError().messages()).toEqual([{ error: 'correct text is missing' }])
    })

    it('should have no error message with correct text', () => {
      Validator.validateText('hej')
      expect(Validator.checkError().hasError).toBe(false)
      expect(Validator.checkError().messages()).toEqual([])
    })
  })
})