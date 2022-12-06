import express from 'express'

const router = express.Router()

router.get('/contacts', (req, res) => {
  res.status(200).json({data: [{
    "firstname": "Anna",
    "lastname": "Andersson",
    "email": "anna.andersson@gmail.com",
    "personalnumber": "550713-1405",
    "address": "Utvecklargatan 12",
    "zipCode": "111 22",
    "city": "Stockholm",
    "country": "Sweden"
  }]})
})

export default router