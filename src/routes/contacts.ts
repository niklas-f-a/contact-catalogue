import express from 'express'


export default () => {
  const router = express.Router()

  router.post('/', (req, res) => {
    console.log(req.body);

    res.status(201).json({})
  })

  return router
}