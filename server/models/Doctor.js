const mongoose = require('mongoose')


const Doctor = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: { unique: true } },
    occupation: { type: String, required: true },
    // Department: { type: String, required: true },
    // status: { type: String, required: true }
  
})

module.exports = mongoose.model('Doctor', Doctor);


