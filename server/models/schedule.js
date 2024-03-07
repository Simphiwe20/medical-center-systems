const mongoose = require('mongoose')

const schedule = new mongoose.Schema({
    description: { type: String, required:true },
    drName: { type: String, require:true },
    startDate: { type: String, required:true },
    endDate: { type: String, required:true }
})

module.exports = mongoose.model('schedule', schedule);