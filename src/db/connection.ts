import mongoose from 'mongoose'
import config from '../config'

export default () => {
  const connectionString = config().dbConnection
  if(!connectionString) {
    throw new Error('Missing Mongo connection string')
  }
  return mongoose.connect(connectionString)
}