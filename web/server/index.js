const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
next();
})

// Set RootDir
app.use('/', express.static(path.join(__dirname, '../client/dist')))

// Set Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define controllers
// Get text from db in specified lang
// Save results into database

// Define routes
const API_ROOT = '/api/v1'

app.get(API_ROOT + '/text', (req, res) => {
  res.send(`This is text in ${req.query.lang} language`)
})

app.post(API_ROOT + '/results', (req, res) => {
  console.log(req.body)
  res.send(`This is results received confirmation`)
})

// Run server
app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`)
})