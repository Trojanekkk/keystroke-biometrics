const fs = require('fs')

exports.getText = async (req, res) => {
  const lang = req.query.lang

  if (typeof(lang) !== 'string')
    return res.status(500).send('Received incorrect data')

  if (lang.length !== 2) 
    return res.status(500).send('Received incorrect data')

  if (!fs.existsSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))
    return res.status(500).send('Internal error')

  const texts = JSON.parse(fs.readFileSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))

  const index = texts.findIndex(text => text.lang === lang)

  if (index === -1)
    return res.status(500).send('Internal error')

  return res.send(texts[index].body)
}

exports.getAvailableLanguages = async (req, res) => {
  if (!fs.existsSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))
    return res.status(500).send('Internal error')
  
  const texts = JSON.parse(fs.readFileSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))

  const languages = texts.map(text => text.lang)

  res.send(languages)
}