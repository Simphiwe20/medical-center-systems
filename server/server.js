const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/medi-centerDB')
    .catch(err => console.log('Something went wrong...', err))


// Middlewares
app.use(express.json())
// app.use(cors())

// Routes
const routes = require('./routes/route');
app.use(routes);

// Listen to port 3000
app.listen(3000, () => {
    console.log('App running on port 3000...')
})