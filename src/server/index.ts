import config from '../config'
import makeApp from '../app'
import dbConnect from '../db/connection'

const app = makeApp()

const port = config().port

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    })
  })
  .catch(error => {
    console.log(error);
  })