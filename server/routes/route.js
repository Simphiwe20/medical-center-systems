const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')

// Default Route
router.get('/', UserController.defaultRoute);
router.post('/patient', UserController.addPatient);
router.post('/doctor', UserController.addDoctor);
router.get('/getDoctor', UserController.getDoctor);
router.get('/getPatient', UserController.getPatient);

module.exports = router;




