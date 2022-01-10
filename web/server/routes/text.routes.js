module.exports = app => {
    const text = require('../controllers/text.controller')

    var router = require('express').Router()

    // Get text
    router.get('/', text.getText)

    // Get available languages
    router.get('/languages', text.getAvailableLanguages)

    app.use(process.env.API_ROOT + '/text', router)
}