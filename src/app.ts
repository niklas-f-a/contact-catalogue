import express from 'express'
import * as routes from './routes'

export default () => {
  const app = express()

  app.use(routes.contacts)

  return app
}
