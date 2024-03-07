const express = require('express')
const app = express()


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/medi-centerDB')
    .then(res => console.log('Connected....'))
    .catch(err => console.log('Something went wrong...', err))


// Middleware
app.use(express.json())
  
const route = require('./routes/route')
app.use(route)

app.listen(3000, () => {
    console.log('App is running on port 3000');
})
