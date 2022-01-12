const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const initDependencies = require('./config/init')
const log = require('log-beautify')
const path = require('path')

// Init dotenv
dotenv.config()

// Init app
const app = express()

// CORS
app.use(cors())
app.options('*', cors())

// Set RootDir
app.use('/', express.static(path.join(__dirname, '../client/dist')))

// Set Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Import routes
require('./routes/text.routes')(app)
require('./routes/result.routes')(app)

// Initialize application dependencies
initDependencies.initStorage()

// Run server
app.listen(process.env.PORT, () => {
  log.success(`Server is running: http://localhost:${process.env.PORT}`)
})
