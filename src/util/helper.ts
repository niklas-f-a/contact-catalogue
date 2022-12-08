
type ParseQuery = {
  page?: string | number,
  limit?: string | number
}

export const parsePageQuery = ({page, limit}: ParseQuery) => {
  const maxLimit = 10
  const newPage = page ? Number(page) : 1
  let newLimit = 10

  if(limit && Number(limit) < maxLimit) {
    newLimit = Number(limit)
  }
  return { page: newPage, limit: newLimit }
}