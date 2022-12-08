

export const parsePageQuery = ({page, limit}: {page?: string, limit?: string}) => {
  const maxLimit = 10
  const newPage = page ? +page : 1
  let newLimit = 10
  if(limit && +limit < maxLimit) {
    newLimit = +limit
  }
  return { page: newPage, limit: newLimit }
}