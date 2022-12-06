import config from '../config'
import makeApp from '../app'

const app = makeApp()

const port = config().port

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})