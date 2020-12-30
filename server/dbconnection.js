const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const dbpassword = process.env.dbpassword || 'root@123'
mongoose.connect(`mongodb+srv://root:${dbpassword}@cluster0.7xvmb.mongodb.net/chat-database?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
    })
const db = mongoose.connection
db.on('error', err => {
    console.log("\n dbcoonection.Error::\n", err)
})
db.once('open', () => {
    console.log('Database connected successfully')
})
