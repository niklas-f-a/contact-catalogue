import * as dotenv from 'dotenv'

dotenv.config()

export default () => {
  return {
    port: Number(process.env.PORT) || 5001,
    dbConnection: process.env.DB_CONNECTION
  }
}