const mongoose = require('mongoose')


const Doctor = new mongoose.Schema({
    docName: { type: String, required: true },
    qualification: { type: String, required: true },
    position: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    Availability: { type: String, required: true }
})

module.exports = mongoose.model('Doctor', Doctor);


// "docName": "DR DRE",
// "qualification": "MBBS,DMRD",
// "position": "Senior",
// "specialization": "General Medicine",
// "experience": "10",
// "mobileNumber":"0658107203",
// "Availability": "Days"