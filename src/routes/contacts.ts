import express from 'express'

const router = express.Router()

router.get('/contacts', (req, res) => {
  res.status(200).json({})
})

export default router