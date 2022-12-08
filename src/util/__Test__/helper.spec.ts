import { parsePageQuery } from "../helper";

describe('Helper functions', () => {
  it('should parse page and limit and be returned as numbers', () => {
    const parsedValue = parsePageQuery({page: '8', limit: '4'})

    expect(parsedValue).toEqual({ page: 8, limit: 4 })
  })

  it('should return page as 1 and limit as 10 when sending empty', () => {
    const parsedValue = parsePageQuery({})

    expect(parsedValue).toEqual({ page: 1, limit: 10 })
  })

  it('should return limit as 10 when sending more than 10', () => {
    const parsedValue = parsePageQuery({limit: '11'})

    expect(parsedValue).toEqual({ page: 1, limit: 10 })
  })

  it('should work sending number as args', () => {
    const parsedValue = parsePageQuery({page: 23, limit: 11})

    expect(parsedValue).toEqual({ page: 23, limit: 10 })
  })


})