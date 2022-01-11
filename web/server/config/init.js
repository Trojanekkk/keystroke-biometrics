const fs = require('fs')

exports.initStorage = () => {
  const textsModel = [
    {
      "body": "This is the text in en language",
      "lang": "en"
    },
    {
      "body": "This is the text in pl language",
      "lang": "pl"
    }
  ]

  const resultsModel = {}

  if (!fs.existsSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME))
    fs.writeFileSync(process.env.DATA_PATH + process.env.TEXTS_FILENAME, JSON.stringify(textsModel))

  if (!fs.existsSync(process.env.DATA_PATH + process.env.RESULTS_FILENAME))
    fs.writeFileSync(process.env.DATA_PATH + process.env.RESULTS_FILENAME, JSON.stringify(resultsModel))
}