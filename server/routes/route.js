const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/', (req, res) => res.send('Get working'))
router.post('/add', UserController.add)
router.get('/getUser/:drName', UserController.getUser)
router.delete('/delete', UserController.delete)

module.exports = router;