import express, { Router } from 'express'

type Routes = {
  contactsRoute: Router
}

export default ({ contactsRoute }: Routes) => {
  const app = express()

  app.use('contacts', contactsRoute)

  return app
}
