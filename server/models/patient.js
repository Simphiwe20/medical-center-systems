const mongoose = require('mongoose')

const patient = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    cellNumber: { type: String, required: true },
    idNumber: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required:true },
    blood: { type: String, required: true },
    symptoms: { type: String, required:true }
})

module.exports = mongoose.model('Patient', patient);